"""ElevenLabs Scribe v2 Realtime WebSocket client.

Wire protocol (server → ElevenLabs):
  JSON text frames:
    {"message_type": "input_audio_chunk", "audio_base_64": "<base64>",
     "commit": false, "sample_rate": 16000}

Wire protocol (ElevenLabs → server):
  JSON text frames discriminated by `message_type`:
    session_started                    — session handshake
    partial_transcript                 — live, may change
    committed_transcript               — final, no timestamps
    committed_transcript_with_timestamps — final + per-word data incl. speaker_id
    <*_error variants>                 — error signals

Audio format required: PCM, 16-bit signed little-endian, 16 kHz, mono.

Reference: https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime
"""

from __future__ import annotations

import asyncio
import base64
import json
import logging
from collections.abc import AsyncIterator
from dataclasses import dataclass, field
from typing import Any

import websockets
from websockets.exceptions import ConnectionClosed, WebSocketException

from server.config import Settings

logger = logging.getLogger(__name__)

_WS_BASE = "wss://api.elevenlabs.io/v1/speech-to-text/realtime"

_BACKOFF_BASE = 1.0
_BACKOFF_MAX = 30.0
_BACKOFF_FACTOR = 2.0
_MAX_RECONNECT_ATTEMPTS = 8

# ── Event types ────────────────────────────────────────────────────────────────


@dataclass
class PartialTranscriptEvent:
    text: str


@dataclass
class CommittedWord:
    text: str
    start_ms: int
    end_ms: int
    speaker_id: str | None  # "speaker_0", "speaker_1", …; None if undetermined
    logprob: float | None


@dataclass
class CommittedTranscriptEvent:
    text: str
    words: list[CommittedWord] = field(default_factory=list)


# Sentinel pushed onto the queue when the stream ends permanently.
class _StreamEnd:
    pass


ScribeEvent = PartialTranscriptEvent | CommittedTranscriptEvent


# ── Service ────────────────────────────────────────────────────────────────────


class ElevenLabsScribeService:
    """Async wrapper around the ElevenLabs Scribe v2 Realtime WebSocket.

    Lifecycle:
      1. Construct with ``Settings``.
      2. Await ``connect()`` — opens WS, waits for session_started, starts tasks.
      3. Await ``send_audio(pcm_bytes)`` for every browser audio frame.
      4. Async-iterate ``transcript_stream()`` to consume transcription events.
      5. Await ``close()`` to tear down gracefully.

    Reconnect strategy: if the upstream WS closes unexpectedly,
    ``_reconnect()`` retries with exponential back-off up to
    ``_MAX_RECONNECT_ATTEMPTS`` times before pushing a sentinel onto the
    transcript queue to signal permanent failure.
    """

    def __init__(self, settings: Settings) -> None:
        self._api_key = settings.elevenlabs_api_key
        self._model = settings.elevenlabs_scribe_model
        self._sample_rate = settings.audio_sample_rate
        self._vad_silence_secs = settings.scribe_vad_silence_secs

        self._ws: websockets.WebSocketClientProtocol | None = None
        self._connected = False
        self._closing = False
        self._reconnecting = False

        self._reader_task: asyncio.Task[None] | None = None
        self._sender_task: asyncio.Task[None] | None = None

        # Bounded queues for back-pressure.
        self._audio_queue: asyncio.Queue[bytes | None] = asyncio.Queue(maxsize=256)
        self._transcript_queue: asyncio.Queue[ScribeEvent | _StreamEnd] = asyncio.Queue(
            maxsize=128
        )

    # ── Public API ─────────────────────────────────────────────────────────────

    async def connect(self) -> None:
        """Open the upstream WebSocket and start background I/O tasks."""
        await self._do_connect()
        self._sender_task = asyncio.create_task(
            self._audio_sender_loop(), name="scribe-sender"
        )

    async def send_audio(self, pcm_bytes: bytes) -> None:
        """Enqueue a raw PCM chunk for forwarding to Scribe.

        Drops the chunk silently if the queue is full (back-pressure) or if a
        reconnect is in progress.
        """
        if self._closing:
            return
        try:
            self._audio_queue.put_nowait(pcm_bytes)
        except asyncio.QueueFull:
            logger.debug("Scribe audio queue full — dropping %d bytes", len(pcm_bytes))

    async def transcript_stream(self) -> AsyncIterator[ScribeEvent]:
        """Yield transcript events as they arrive from Scribe.

        Stops iteration when a ``_StreamEnd`` sentinel is dequeued (permanent
        failure or ``close()`` was called).
        """
        while True:
            event = await self._transcript_queue.get()
            if isinstance(event, _StreamEnd):
                return
            yield event

    async def close(self) -> None:
        """Gracefully shut down: cancel tasks, close WS, drain queues."""
        self._closing = True
        self._connected = False

        # Stop the audio sender.
        try:
            self._audio_queue.put_nowait(None)
        except asyncio.QueueFull:
            pass

        for task in (self._sender_task, self._reader_task):
            if task and not task.done():
                task.cancel()

        if self._ws:
            try:
                await self._ws.close()
            except Exception:
                pass

        # Unblock any consumer waiting on transcript_stream().
        try:
            self._transcript_queue.put_nowait(_StreamEnd())
        except asyncio.QueueFull:
            pass

    # ── Internal helpers ───────────────────────────────────────────────────────

    def _build_url(self) -> str:
        params = "&".join(
            [
                f"model_id={self._model}",
                "include_timestamps=true",
                "commit_strategy=vad",
                f"vad_silence_threshold_secs={self._vad_silence_secs}",
            ]
        )
        url = f"{_WS_BASE}?{params}"
        logger.info("Scribe URL: %s", url)
        return url

    async def _do_connect(self) -> None:
        """Open WS, await session_started, spawn reader task."""
        url = self._build_url()
        headers = {"xi-api-key": self._api_key}
        self._ws = await websockets.connect(url, additional_headers=headers)
        self._connected = True

        # The first message MUST be session_started.
        raw = await self._ws.recv()
        data: dict[str, Any] = json.loads(raw)
        if data.get("message_type") != "session_started":
            logger.warning("Unexpected first Scribe message: %s", data)
        else:
            logger.info("Scribe session started — id=%s", data.get("session_id"))

        if self._reader_task and not self._reader_task.done():
            self._reader_task.cancel()
        self._reader_task = asyncio.create_task(
            self._reader_loop(), name="scribe-reader"
        )

    async def _audio_sender_loop(self) -> None:
        """Dequeue audio chunks and forward them to the Scribe WebSocket."""
        while True:
            chunk = await self._audio_queue.get()
            if chunk is None:
                return  # shutdown sentinel

            if not self._connected or self._ws is None:
                continue  # discard during reconnect

            try:
                encoded = base64.b64encode(chunk).decode()
                payload = json.dumps(
                    {
                        "message_type": "input_audio_chunk",
                        "audio_base_64": encoded,
                        "commit": False,
                        "sample_rate": self._sample_rate,
                    }
                )
                await self._ws.send(payload)
            except (ConnectionClosed, WebSocketException) as exc:
                logger.warning("Scribe send error: %s — triggering reconnect", exc)
                self._connected = False
                if not self._reconnecting and not self._closing:
                    asyncio.create_task(self._reconnect(), name="scribe-reconnect")

    async def _reader_loop(self) -> None:
        """Read frames from Scribe, parse, and enqueue transcript events."""
        try:
            async for raw in self._ws:
                try:
                    data: dict[str, Any] = json.loads(raw)
                except json.JSONDecodeError:
                    logger.warning("Non-JSON from Scribe: %.200s", raw)
                    continue

                msg_type: str = data.get("message_type", "")

                if msg_type == "partial_transcript":
                    text = data.get("text", "")
                    if text:
                        await self._safe_enqueue(PartialTranscriptEvent(text=text))

                elif msg_type == "committed_transcript_with_timestamps":
                    # We always request include_timestamps=true, so ElevenLabs
                    # sends both committed_transcript_with_timestamps AND
                    # committed_transcript for the same segment. We process only
                    # the timestamped variant (which also carries speaker_id) and
                    # ignore the plain one to avoid emitting duplicate events.
                    text = data.get("text", "")
                    raw_words: list[dict[str, Any]] = data.get("words") or []
                    speaker_ids = [
                        w.get("speaker_id") for w in raw_words if w.get("type") == "word"
                    ]
                    logger.info(
                        "Scribe committed: %r | speaker_ids=%s",
                        text[:60],
                        speaker_ids,
                    )
                    words = [
                        CommittedWord(
                            text=w["text"],
                            start_ms=int(w.get("start", 0.0) * 1000),
                            end_ms=int(w.get("end", 0.0) * 1000),
                            speaker_id=w.get("speaker_id"),
                            logprob=w.get("logprob"),
                        )
                        for w in raw_words
                        if w.get("type") == "word"
                    ]
                    await self._safe_enqueue(
                        CommittedTranscriptEvent(text=text, words=words)
                    )

                elif msg_type == "committed_transcript":
                    # Duplicate of committed_transcript_with_timestamps — skip.
                    logger.debug("Scribe: ignoring redundant committed_transcript")

                elif msg_type == "session_started":
                    pass  # already handled in _do_connect

                elif msg_type:
                    # All error variants end with _error or have known names.
                    logger.error(
                        "Scribe [%s]: %s",
                        msg_type,
                        data.get("error", data),
                    )

        except ConnectionClosed as exc:
            logger.warning("Scribe WS closed: %s", exc)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            logger.error("Scribe reader unexpected error: %s", exc)
        finally:
            self._connected = False
            if not self._closing and not self._reconnecting:
                asyncio.create_task(self._reconnect(), name="scribe-reconnect")

    async def _reconnect(self) -> None:
        """Exponential back-off reconnect. Pushes _StreamEnd on permanent failure."""
        if self._reconnecting or self._closing:
            return
        self._reconnecting = True
        delay = _BACKOFF_BASE

        for attempt in range(1, _MAX_RECONNECT_ATTEMPTS + 1):
            logger.info(
                "Scribe reconnect attempt %d/%d in %.1fs",
                attempt,
                _MAX_RECONNECT_ATTEMPTS,
                delay,
            )
            await asyncio.sleep(delay)
            if self._closing:
                break
            try:
                await self._do_connect()
                self._reconnecting = False
                logger.info("Scribe reconnected on attempt %d", attempt)
                return
            except Exception as exc:
                logger.warning("Reconnect %d failed: %s", attempt, exc)
                delay = min(delay * _BACKOFF_FACTOR, _BACKOFF_MAX)

        logger.error("Scribe: exhausted reconnect attempts — terminating stream.")
        self._reconnecting = False
        await self._safe_enqueue(_StreamEnd())

    async def _safe_enqueue(self, event: ScribeEvent | _StreamEnd) -> None:
        """Put an event onto the transcript queue, dropping oldest if full."""
        try:
            self._transcript_queue.put_nowait(event)
        except asyncio.QueueFull:
            # Drop oldest to make room for the fresh event.
            try:
                self._transcript_queue.get_nowait()
            except asyncio.QueueEmpty:
                pass
            try:
                self._transcript_queue.put_nowait(event)
            except asyncio.QueueFull:
                pass
