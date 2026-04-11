"""WebSocket route handler for a real-time conversation session.

Audio pipeline (browser → server):
  Browser records audio via MediaRecorder while the user holds the
  record button.  On release, the complete Blob is sent as a single
  binary WebSocket frame.

Wire protocol (browser → server):
  Binary frames: complete audio recording (webm/opus from MediaRecorder).
  Text frames: JSON control messages
    {"type": "end_session"}

Wire protocol (server → browser):
  {"type": "processing"}                        — audio received, analysing
  {"type": "no_speech"}                         — nothing detected
  {"type": "transcript",
   "speaker": "speaker_a"|"speaker_b",
   "text": "...", "is_partial": false,
   "turn_id": "<uuid>"}
  {"type": "turn_complete",
   "speaker": "...", "turn_id": "<uuid>"}
  {"type": "argument_update",
   "speaker": "...", "role": "argument"|"counterargument",
   "delta": "...", "turn_id": "<uuid>", "is_final": false}
  {"type": "argument_complete",
   "speaker": "...", "turn_id": "<uuid>"}
  {"type": "error", "message": "..."}
  {"type": "session_ended"}

Speaker detection:
  pyannote/speaker-diarization-3.1 automatically identifies the two
  speakers from voice characteristics.  No push-to-talk or manual
  labelling is required.  The first voice heard becomes Speaker A,
  the second becomes Speaker B; this mapping is stable for the life
  of the session.
"""

from __future__ import annotations

import asyncio
import json
import logging
import uuid

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from server.config import get_settings
from server.models.turn import (
    SessionState,
    SpeakerBuffer,
    SpeakerLabel,
    TranscriptWord,
    TranscriptWordStatus,
    Turn,
)
from server.services.claude import ClaudeService
from server.services.diarization import diarizer

logger = logging.getLogger(__name__)
router = APIRouter()

# SPEAKER_00 from pyannote → Speaker A; SPEAKER_01 → Speaker B.
_PYANNOTE_TO_LABEL = {
    "SPEAKER_00": SpeakerLabel.SPEAKER_A,
    "SPEAKER_01": SpeakerLabel.SPEAKER_B,
}


@router.websocket("/ws/conversation")
async def conversation_ws(websocket: WebSocket) -> None:
    """Accept a conversation WebSocket and run the diarization pipeline."""
    settings = get_settings()
    await websocket.accept()

    session_id = str(uuid.uuid4())
    state = SessionState(session_id=session_id)
    claude = ClaudeService(settings)

    # Reset per-session speaker memory so SPEAKER_00 is always the first
    # voice heard in *this* session.
    diarizer.reset()

    logger.info("Session %s opened", session_id)

    try:
        while state.is_active:
            message = await websocket.receive()

            # ── Binary: complete audio blob ────────────────────────────────────
            if "bytes" in message and message["bytes"]:
                await websocket.send_json({"type": "processing"})

                segments: list[dict] = await asyncio.to_thread(
                    diarizer.process_audio_chunk,
                    message["bytes"],
                    settings.audio_sample_rate,
                )

                if not segments:
                    await websocket.send_json({"type": "no_speech"})
                    continue

                # Group consecutive segments from the same speaker into turns.
                turns = _group_into_turns(segments)

                for turn_data in turns:
                    speaker = _PYANNOTE_TO_LABEL.get(
                        turn_data["speaker"], SpeakerLabel.SPEAKER_A
                    )
                    turn_id = str(uuid.uuid4())
                    full_text = turn_data["text"]
                    word_count = len(full_text.split())

                    # Send transcript to frontend.
                    await websocket.send_json({
                        "type": "transcript",
                        "speaker": speaker.value,
                        "text": full_text,
                        "is_partial": False,
                        "turn_id": turn_id,
                    })

                    if word_count < settings.min_turn_words:
                        continue

                    # Build Turn model and update session state.
                    turn = _make_turn(turn_id, speaker, full_text, turn_data)
                    buf = _get_buffer(state, speaker)
                    opp_buf = _get_buffer(state, _opponent(speaker))
                    buf.completed_turns.append(turn)
                    state.transcript.append(turn)

                    await websocket.send_json({
                        "type": "turn_complete",
                        "speaker": speaker.value,
                        "turn_id": turn_id,
                    })

                    logger.info(
                        "Session %s: Claude for %s turn %s (%d words)",
                        session_id, speaker.value, turn_id, word_count,
                    )

                    # Stream Claude arguments.
                    try:
                        async for update in claude.generate_arguments(
                            turn,
                            speaker_context=buf.context_text(),
                            opponent_context=opp_buf.context_text(),
                        ):
                            await websocket.send_json({
                                "type": "argument_update",
                                "speaker": update.speaker.value,
                                "role": update.role.value,
                                "delta": update.delta,
                                "turn_id": update.turn_id,
                                "is_final": update.is_final,
                            })
                    except Exception as exc:
                        logger.error("Claude error: %s", exc)
                        await websocket.send_json({"type": "error", "message": str(exc)})

                    await websocket.send_json({
                        "type": "argument_complete",
                        "speaker": speaker.value,
                        "turn_id": turn_id,
                    })

                    # Emotion tags — non-blocking, fires after arguments are done.
                    try:
                        tags = await claude.generate_emotions(turn)
                        if tags:
                            await websocket.send_json({
                                "type": "emotion_tags",
                                "speaker": speaker.value,
                                "turn_id": turn_id,
                                "tags": tags,
                            })
                    except Exception as exc:
                        logger.warning("Emotion tags error for turn %s: %s", turn_id, exc)

            # ── Text: control messages ─────────────────────────────────────────
            elif "text" in message and message["text"]:
                try:
                    payload = json.loads(message["text"])
                except json.JSONDecodeError:
                    continue
                if payload.get("type") == "end_session":
                    state.is_active = False
                    await websocket.send_json({"type": "session_ended"})

    except WebSocketDisconnect:
        logger.info("Session %s: client disconnected", session_id)
    except Exception as exc:
        logger.error("Session %s fatal error: %s", session_id, exc, exc_info=True)
        try:
            await websocket.send_json({"type": "error", "message": str(exc)})
        except Exception:
            pass
    finally:
        state.is_active = False
        logger.info("Session %s closed", session_id)


# ── Helpers ────────────────────────────────────────────────────────────────────


def _group_into_turns(segments: list[dict]) -> list[dict]:
    """Merge consecutive segments from the same speaker into a single turn."""
    if not segments:
        return []

    turns: list[dict] = []
    current = dict(segments[0])

    for seg in segments[1:]:
        if seg["speaker"] == current["speaker"]:
            current["text"] = current["text"] + " " + seg["text"]
            current["end"] = seg["end"]
        else:
            turns.append(current)
            current = dict(seg)

    turns.append(current)
    return turns


def _get_buffer(state: SessionState, speaker: SpeakerLabel) -> SpeakerBuffer:
    return state.speaker_a if speaker == SpeakerLabel.SPEAKER_A else state.speaker_b


def _opponent(speaker: SpeakerLabel) -> SpeakerLabel:
    return SpeakerLabel.SPEAKER_B if speaker == SpeakerLabel.SPEAKER_A else SpeakerLabel.SPEAKER_A


def _make_turn(
    turn_id: str,
    speaker: SpeakerLabel,
    full_text: str,
    turn_data: dict,
) -> Turn:
    """Build a Turn from a diarized segment group."""
    start_ms = int(turn_data.get("start", 0) * 1000)
    end_ms = int(turn_data.get("end", 0) * 1000)
    words = [
        TranscriptWord(
            text=word,
            start_ms=start_ms,
            end_ms=end_ms,
            status=TranscriptWordStatus.FINAL,
        )
        for word in full_text.split()
    ]
    return Turn(turn_id=turn_id, speaker=speaker, words=words, is_final=True)
