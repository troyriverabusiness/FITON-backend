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
from collections import defaultdict
from datetime import datetime, timezone

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from server.config import get_settings
from server.db import async_session
from server.models.db import Conversation as DBConversation, DBTurn
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

    # Accumulate streamed argument text so we can persist the full result.
    # Structure: { turn_id: { "argument": "...", "counterargument": "..." } }
    arg_accumulator: dict[str, dict[str, str]] = defaultdict(
        lambda: {"argument": "", "counterargument": ""}
    )
    # Accumulate emotion tags per turn_id (list of {tag, confidence} dicts).
    emotion_accumulator: dict[str, list[dict]] = {}
    # Accumulate argument confidence scores per turn_id.
    arg_confidence_accumulator: dict[str, dict[str, int | None]] = {}
    # Track turn ordering and speaker/text for persistence.
    turn_order: list[tuple[str, str, str]] = []  # (turn_id, speaker, text)
    # Mediator: run every MEDIATION_INTERVAL completed turns.
    MEDIATION_INTERVAL = 3
    turns_since_mediation = 0
    session_start = datetime.now(timezone.utc)

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

                    turn_order.append((turn_id, speaker.value, full_text))

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
                            if update.delta:
                                arg_accumulator[update.turn_id][update.role.value] += update.delta
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

                    # Argument confidence — non-blocking, fires after arguments are done.
                    try:
                        args = arg_accumulator[turn_id]
                        confidence = await claude.generate_argument_confidence(
                            turn,
                            argument_text=args.get("argument", ""),
                            counterargument_text=args.get("counterargument", ""),
                        )
                        arg_confidence_accumulator[turn_id] = confidence
                        await websocket.send_json({
                            "type": "argument_confidence",
                            "speaker": speaker.value,
                            "turn_id": turn_id,
                            "argument": confidence.get("argument"),
                            "counterargument": confidence.get("counterargument"),
                        })
                    except Exception as exc:
                        logger.warning("Argument confidence error for turn %s: %s", turn_id, exc)

                    # Emotion tags — non-blocking, fires after arguments are done.
                    try:
                        tags = await claude.generate_emotions(turn)
                        if tags:
                            emotion_accumulator[turn_id] = tags
                            await websocket.send_json({
                                "type": "emotion_tags",
                                "speaker": speaker.value,
                                "turn_id": turn_id,
                                "tags": tags,
                            })
                    except Exception as exc:
                        logger.warning("Emotion tags error for turn %s: %s", turn_id, exc)

                    # AI Mediator — fires every MEDIATION_INTERVAL turns.
                    turns_since_mediation += 1
                    if turns_since_mediation >= MEDIATION_INTERVAL:
                        turns_since_mediation = 0
                        try:
                            # Use the last 6 turns for context.
                            recent = turn_order[-6:]
                            emotion_signals = [
                                (spk, [e["tag"] for e in emotion_accumulator.get(tid, [])])
                                for tid, spk, _ in recent
                            ]
                            recent_text = [(spk, txt) for _, spk, txt in recent]
                            alert = await claude.generate_mediation(recent_text, emotion_signals)
                            if alert:
                                logger.info(
                                    "Session %s: mediation alert — %s (%s)",
                                    session_id, alert["trigger"], alert["severity"],
                                )
                                await websocket.send_json({
                                    "type": "mediation_alert",
                                    "trigger": alert["trigger"],
                                    "severity": alert["severity"],
                                    "message": alert["message"],
                                })
                        except Exception as exc:
                            logger.warning("Mediator error: %s", exc)

            # ── Text: control messages ─────────────────────────────────────────
            elif "text" in message and message["text"]:
                try:
                    payload = json.loads(message["text"])
                except json.JSONDecodeError:
                    continue
                if payload.get("type") == "end_session":
                    await _save_conversation(
                        session_id, session_start, turn_order,
                        arg_accumulator, emotion_accumulator,
                        arg_confidence_accumulator,
                        claude,
                    )
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


async def _save_conversation(
    session_id: str,
    started_at: datetime,
    turn_order: list[tuple[str, str, str]],
    arg_accumulator: dict[str, dict[str, str]],
    emotion_accumulator: dict[str, list[dict]],
    arg_confidence_accumulator: dict[str, dict[str, int | None]],
    claude: ClaudeService,
) -> None:
    """Persist the completed conversation and its turns to the database."""
    if not turn_order:
        return

    title = await claude.generate_title([(spk, txt) for _, spk, txt in turn_order])

    try:
        async with async_session() as session:
            conversation = DBConversation(
                id=uuid.UUID(session_id),
                created_at=started_at,
                ended_at=datetime.now(timezone.utc),
                title=title,
            )
            session.add(conversation)

            for position, (turn_id, speaker, text) in enumerate(turn_order):
                args = arg_accumulator.get(turn_id, {})
                emotions = emotion_accumulator.get(turn_id)
                # Store emotion tags as plain strings for the legacy column;
                # store the full {tag, confidence} objects in the confidence column.
                emotion_tag_strings = [e["tag"] for e in emotions] if emotions else None
                emotion_conf = {e["tag"]: e["confidence"] for e in emotions} if emotions else None
                db_turn = DBTurn(
                    id=uuid.UUID(turn_id),
                    conversation_id=conversation.id,
                    speaker=speaker,
                    text=text,
                    argument_text=args.get("argument", ""),
                    counterargument_text=args.get("counterargument", ""),
                    emotion_tags=emotion_tag_strings,
                    emotion_confidence=emotion_conf,
                    argument_confidence=arg_confidence_accumulator.get(turn_id),
                    position=position,
                )
                session.add(db_turn)

            await session.commit()
            logger.info("Session %s: conversation saved (%d turns)", session_id, len(turn_order))
    except Exception as exc:
        logger.error("Session %s: failed to save conversation: %s", session_id, exc)


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
