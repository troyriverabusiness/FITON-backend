"""Pydantic models for a real-time conversation session."""

from __future__ import annotations

from collections import deque
from enum import Enum
from typing import Deque

from pydantic import BaseModel, Field


# ── Enums ─────────────────────────────────────────────────────────────────────


class SpeakerLabel(str, Enum):
    """The two participants in a conversation session."""

    SPEAKER_A = "speaker_a"
    SPEAKER_B = "speaker_b"


class ArgumentRole(str, Enum):
    """Whether a Claude-generated text is an argument or a counterargument."""

    ARGUMENT = "argument"
    COUNTERARGUMENT = "counterargument"


class TranscriptWordStatus(str, Enum):
    """Confidence/finality state of a transcribed word from Scribe Realtime."""

    PARTIAL = "partial"    # word may still change
    FINAL = "final"        # word is committed


# ── Transcript primitives ─────────────────────────────────────────────────────


class TranscriptWord(BaseModel):
    """A single word token as returned by ElevenLabs Scribe Realtime.

    TODO: Map the actual field names from the ElevenLabs WebSocket payload
    once the Scribe v2 Realtime API schema is confirmed.
    """

    text: str
    start_ms: int = Field(..., description="Word start time in milliseconds.")
    end_ms: int = Field(..., description="Word end time in milliseconds.")
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    status: TranscriptWordStatus = TranscriptWordStatus.PARTIAL


class Turn(BaseModel):
    """A contiguous block of speech from a single speaker.

    A new Turn begins when the active speaker changes or after a silence
    longer than `Settings.silence_timeout_seconds`.
    """

    turn_id: str = Field(..., description="UUID assigned at turn creation.")
    speaker: SpeakerLabel
    words: list[TranscriptWord] = Field(default_factory=list)
    is_final: bool = False

    @property
    def text(self) -> str:
        """Return the full assembled transcript text for this turn.

        TODO: Handle partial/final merging — final words should overwrite
        their partial counterparts at the same time offset rather than appending.
        """
        return " ".join(w.text for w in self.words)

    @property
    def word_count(self) -> int:
        return len(self.words)


# ── Per-speaker rolling buffer ─────────────────────────────────────────────────


class SpeakerBuffer(BaseModel):
    """Rolling buffer that accumulates partial transcripts for one speaker.

    Holds the current in-progress Turn and a fixed-length history of completed
    turns used as context when prompting Claude.
    """

    speaker: SpeakerLabel
    current_turn: Turn | None = None
    # TODO: Decide on a reasonable history length; 10 turns ≈ ~5 min of dialogue.
    completed_turns: Deque[Turn] = Field(
        default_factory=lambda: deque(maxlen=10),
        description="Ring buffer of the most recent completed turns.",
    )
    # Timestamp (monotonic seconds) of the last audio chunk received for this speaker.
    last_audio_at: float = 0.0

    model_config = {"arbitrary_types_allowed": True}

    def context_text(self) -> str:
        """Return recent completed turns as a plain-text block for prompting.

        TODO: Implement a smarter windowing strategy — e.g. token-count based
        rather than turn-count based — to stay within Claude's context window.
        """
        return "\n".join(t.text for t in self.completed_turns)


# ── Claude output model ────────────────────────────────────────────────────────


class ArgumentUpdate(BaseModel):
    """A streaming delta from Claude for a single argument or counterargument.

    The frontend accumulates these deltas token-by-token into the ArgumentPanel.
    """

    turn_id: str = Field(..., description="The Turn that triggered this generation.")
    speaker: SpeakerLabel
    role: ArgumentRole
    # A partial or complete text token streamed from Claude.
    delta: str = Field(..., description="Incremental text token from the stream.")
    is_final: bool = Field(
        default=False,
        description="True on the last delta for this turn/role pair.",
    )


# ── Session-level envelope ─────────────────────────────────────────────────────


class SessionState(BaseModel):
    """Top-level container for one active conversation session.

    TODO: Persist session state to Redis (or similar) so that multiple
    server replicas can share a session without sticky routing.
    """

    session_id: str
    speaker_a: SpeakerBuffer = Field(
        default_factory=lambda: SpeakerBuffer(speaker=SpeakerLabel.SPEAKER_A)
    )
    speaker_b: SpeakerBuffer = Field(
        default_factory=lambda: SpeakerBuffer(speaker=SpeakerLabel.SPEAKER_B)
    )
    # Ordered list of all turns across both speakers, for rendering the transcript.
    transcript: list[Turn] = Field(default_factory=list)
    is_active: bool = True
    # Last speaker indicated by the client-side prefix byte (0x00=A, 0x01=B).
    # Updated by the receive loop; used to attribute committed transcripts when
    # Scribe does not return per-word speaker_ids.
    hint_speaker: SpeakerLabel = SpeakerLabel.SPEAKER_A
