"""WebSocket route handler for a real-time conversation session.

Wire protocol (browser → server):
  Binary frames: raw 16-bit PCM audio, 16 kHz, mono, little-endian.
    Optionally prefixed with a 1-byte speaker hint (0=A, 1=B).  The prefix
    is stripped and ignored — diarization is handled entirely by Scribe.
  Text frames: JSON control messages
    {"type": "end_session"}

Wire protocol (server → browser):
  Text frames: JSON discriminated by ``type``:
    {"type": "transcript",      "speaker": "speaker_a"|"speaker_b"|"unknown",
     "text": "...",             "is_partial": true|false,
     "turn_id": "<uuid>"}

    {"type": "turn_complete",   "speaker": "...", "turn_id": "<uuid>"}

    {"type": "argument_update", "speaker": "...", "role": "argument"|"counterargument",
     "delta": "...",            "turn_id": "<uuid>", "is_final": false}

    {"type": "argument_complete","speaker": "...", "turn_id": "<uuid>"}

    {"type": "error",           "message": "..."}

    {"type": "session_ended"}

Concurrency model:
  Two asyncio Tasks are launched via TaskGroup inside ``_run_session``:
    1. ``_receive_browser_loop`` — reads browser frames, forwards audio to Scribe.
    2. ``_process_scribe_loop``  — consumes Scribe events, updates SessionState,
                                   triggers Claude, and streams updates to browser.
  Either task raising an unhandled exception cancels the other automatically.
"""

from __future__ import annotations

import asyncio
import json
import logging
import math
import uuid

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from server.config import get_settings
from server.models.turn import (
    SessionState,
    SpeakerBuffer,
    SpeakerLabel,
    Turn,
    TranscriptWord,
    TranscriptWordStatus,
)
from server.services.claude import ClaudeService
from server.services.elevenlabs import (
    CommittedTranscriptEvent,
    ElevenLabsScribeService,
    PartialTranscriptEvent,
)

logger = logging.getLogger(__name__)
router = APIRouter()

# Audio frames from the browser may be prefixed with a 1-byte speaker hint.
# Any frame shorter than this threshold is treated as pure audio (no prefix).
_SPEAKER_PREFIX_THRESHOLD = 2


# ── Route ──────────────────────────────────────────────────────────────────────


@router.websocket("/ws/conversation")
async def conversation_ws(websocket: WebSocket) -> None:
    """Accept a conversation WebSocket and orchestrate the full pipeline."""
    settings = get_settings()
    await websocket.accept()

    session_id = str(uuid.uuid4())
    state = SessionState(session_id=session_id)
    scribe = ElevenLabsScribeService(settings)
    claude = ClaudeService(settings)

    logger.info("Session %s opened", session_id)

    try:
        await scribe.connect()
        await _run_session(websocket, state, scribe, claude)
    except WebSocketDisconnect:
        logger.info("Session %s: browser disconnected", session_id)
    except Exception as exc:
        logger.error("Session %s fatal error: %s", session_id, exc)
        try:
            await websocket.send_json({"type": "error", "message": str(exc)})
        except Exception:
            pass
    finally:
        state.is_active = False
        await scribe.close()
        logger.info("Session %s closed", session_id)


# ── Session loop ───────────────────────────────────────────────────────────────


async def _run_session(
    websocket: WebSocket,
    state: SessionState,
    scribe: ElevenLabsScribeService,
    claude: ClaudeService,
) -> None:
    """Run the two concurrent pipeline tasks until either completes."""
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(
                _receive_browser_loop(websocket, state, scribe),
                name="receive-browser",
            )
            tg.create_task(
                _process_scribe_loop(websocket, state, scribe, claude),
                name="process-scribe",
            )
    except* WebSocketDisconnect:
        raise  # propagate so the outer handler can clean up
    except* asyncio.CancelledError:
        pass
    except* Exception as eg:
        for exc in eg.exceptions:
            logger.error("Session task error: %s", exc)


# ── Task 1: browser → Scribe ───────────────────────────────────────────────────


async def _receive_browser_loop(
    websocket: WebSocket,
    state: SessionState,
    scribe: ElevenLabsScribeService,
) -> None:
    """Read audio frames (and control messages) from the browser WebSocket."""
    while state.is_active:
        message = await websocket.receive()

        if "bytes" in message:
            raw: bytes = message["bytes"]
            if not raw:
                continue
            # Strip optional 1-byte speaker prefix (0 or 1) if present.
            # The prefix is a browser-side hint; diarization comes from Scribe.
            if len(raw) > _SPEAKER_PREFIX_THRESHOLD and raw[0] in (0, 1):
                pcm = raw[1:]
            else:
                pcm = raw
            await scribe.send_audio(pcm)

        elif "text" in message:
            try:
                payload = json.loads(message["text"])
            except json.JSONDecodeError:
                continue
            if payload.get("type") == "end_session":
                state.is_active = False
                await websocket.send_json({"type": "session_ended"})
                break


# ── Task 2: Scribe → browser (+ Claude) ───────────────────────────────────────


async def _process_scribe_loop(
    websocket: WebSocket,
    state: SessionState,
    scribe: ElevenLabsScribeService,
    claude: ClaudeService,
) -> None:
    """Consume Scribe events, update SessionState, trigger Claude on turn end."""
    settings = get_settings()

    # Maps Scribe's "speaker_0"/"speaker_1" to our SpeakerLabel.
    speaker_map: dict[str, SpeakerLabel] = {}

    # Per-speaker silence timer handles: asyncio.TimerHandle | None
    silence_tasks: dict[SpeakerLabel, asyncio.Task[None] | None] = {
        SpeakerLabel.SPEAKER_A: None,
        SpeakerLabel.SPEAKER_B: None,
    }

    # Accumulated committed text since last Claude call, per speaker.
    pending_text: dict[SpeakerLabel, list[str]] = {
        SpeakerLabel.SPEAKER_A: [],
        SpeakerLabel.SPEAKER_B: [],
    }

    async def _flush_and_call_claude(speaker: SpeakerLabel) -> None:
        """Finalise accumulated text and stream Claude's analysis to browser."""
        chunks = pending_text[speaker]
        if not chunks:
            return
        full_text = " ".join(chunks)
        pending_text[speaker] = []

        word_count = len(full_text.split())
        if word_count < settings.min_turn_words:
            logger.debug(
                "Speaker %s: turn too short (%d words) — skipping Claude",
                speaker.value,
                word_count,
            )
            return

        turn_id = str(uuid.uuid4())
        turn = _make_turn(turn_id, speaker, full_text)

        buf = _get_buffer(state, speaker)
        opp_buf = _get_buffer(state, _opponent(speaker))
        buf.completed_turns.append(turn)
        state.transcript.append(turn)

        await websocket.send_json(
            {"type": "turn_complete", "speaker": speaker.value, "turn_id": turn_id}
        )

        logger.info(
            "Session %s: Claude for %s turn %s (%d words)",
            state.session_id,
            speaker.value,
            turn_id,
            word_count,
        )

        try:
            async for update in claude.generate_arguments(
                turn,
                speaker_context=buf.context_text(),
                opponent_context=opp_buf.context_text(),
            ):
                await websocket.send_json(
                    {
                        "type": "argument_update",
                        "speaker": update.speaker.value,
                        "role": update.role.value,
                        "delta": update.delta,
                        "turn_id": update.turn_id,
                        "is_final": update.is_final,
                    }
                )
        except Exception as exc:
            logger.error("Claude generation error: %s", exc)
            await websocket.send_json({"type": "error", "message": str(exc)})

        await websocket.send_json(
            {
                "type": "argument_complete",
                "speaker": speaker.value,
                "turn_id": turn_id,
            }
        )

    def _schedule_silence(speaker: SpeakerLabel) -> None:
        """Cancel any pending silence task and start a fresh one."""
        existing = silence_tasks[speaker]
        if existing and not existing.done():
            existing.cancel()

        async def _timer() -> None:
            await asyncio.sleep(settings.silence_timeout_seconds)
            await _flush_and_call_claude(speaker)

        silence_tasks[speaker] = asyncio.create_task(_timer(), name=f"silence-{speaker.value}")

    async for event in scribe.transcript_stream():
        if not state.is_active:
            break

        if isinstance(event, PartialTranscriptEvent):
            # Forward live partial text without speaker attribution.
            buf = _get_buffer(state, SpeakerLabel.SPEAKER_A)  # best-effort
            turn_id = _ensure_current_turn(buf, state.session_id).turn_id
            await websocket.send_json(
                {
                    "type": "transcript",
                    "speaker": "unknown",
                    "text": event.text,
                    "is_partial": True,
                    "turn_id": turn_id,
                }
            )

        elif isinstance(event, CommittedTranscriptEvent):
            # Determine dominant speaker from word-level speaker_ids.
            speaker = _dominant_speaker(event, speaker_map)

            buf = _get_buffer(state, speaker)

            # Build a turn_id that's stable for this committed segment.
            turn_id = str(uuid.uuid4())

            # Accumulate for Claude (possibly merged with prior short commits).
            pending_text[speaker].append(event.text)

            # Reset current partial turn with committed text.
            words = _committed_to_transcript_words(event)
            buf.current_turn = Turn(
                turn_id=turn_id,
                speaker=speaker,
                words=words,
                is_final=True,
            )

            await websocket.send_json(
                {
                    "type": "transcript",
                    "speaker": speaker.value,
                    "text": event.text,
                    "is_partial": False,
                    "turn_id": turn_id,
                }
            )

            # Schedule Claude call after silence_timeout_seconds of no new commits.
            _schedule_silence(speaker)


# ── Helpers ────────────────────────────────────────────────────────────────────


def _get_buffer(state: SessionState, speaker: SpeakerLabel) -> SpeakerBuffer:
    return state.speaker_a if speaker == SpeakerLabel.SPEAKER_A else state.speaker_b


def _opponent(speaker: SpeakerLabel) -> SpeakerLabel:
    return (
        SpeakerLabel.SPEAKER_B
        if speaker == SpeakerLabel.SPEAKER_A
        else SpeakerLabel.SPEAKER_A
    )


def _ensure_current_turn(buf: SpeakerBuffer, session_id: str) -> Turn:
    if buf.current_turn is None:
        buf.current_turn = Turn(
            turn_id=str(uuid.uuid4()),
            speaker=buf.speaker,
        )
    return buf.current_turn


def _dominant_speaker(
    event: CommittedTranscriptEvent,
    speaker_map: dict[str, SpeakerLabel],
) -> SpeakerLabel:
    """Return the SpeakerLabel that spoke the most words in this segment."""
    counts: dict[str, int] = {}
    for w in event.words:
        sid = w.speaker_id
        if sid:
            counts[sid] = counts.get(sid, 0) + 1

    if not counts:
        # No diarization data — use SPEAKER_A as fallback.
        return SpeakerLabel.SPEAKER_A

    dominant_scribe_id = max(counts, key=lambda k: counts[k])

    # Lazily assign: first seen → SPEAKER_A, second → SPEAKER_B.
    if dominant_scribe_id not in speaker_map:
        if not speaker_map:
            speaker_map[dominant_scribe_id] = SpeakerLabel.SPEAKER_A
        else:
            # Assign the next unassigned label.
            assigned = set(speaker_map.values())
            for label in (SpeakerLabel.SPEAKER_A, SpeakerLabel.SPEAKER_B):
                if label not in assigned:
                    speaker_map[dominant_scribe_id] = label
                    break
            else:
                # More than 2 speakers — map extras to SPEAKER_B.
                speaker_map[dominant_scribe_id] = SpeakerLabel.SPEAKER_B

    return speaker_map[dominant_scribe_id]


def _committed_to_transcript_words(event: CommittedTranscriptEvent) -> list[TranscriptWord]:
    def _logprob_to_confidence(lp: float | None) -> float:
        """Convert a log-probability (≤ 0) to a linear probability in [0, 1]."""
        if lp is None:
            return 1.0
        return min(1.0, max(0.0, math.exp(lp)))

    return [
        TranscriptWord(
            text=w.text,
            start_ms=w.start_ms,
            end_ms=w.end_ms,
            confidence=_logprob_to_confidence(w.logprob),
            status=TranscriptWordStatus.FINAL,
        )
        for w in event.words
    ]


def _make_turn(turn_id: str, speaker: SpeakerLabel, full_text: str) -> Turn:
    """Create a finalised Turn from plain text (no per-word timestamps)."""
    words = [
        TranscriptWord(
            text=word,
            start_ms=0,
            end_ms=0,
            status=TranscriptWordStatus.FINAL,
        )
        for word in full_text.split()
    ]
    return Turn(turn_id=turn_id, speaker=speaker, words=words, is_final=True)
