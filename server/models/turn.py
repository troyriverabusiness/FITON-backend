"""Pydantic models for a real-time conversation session."""

from __future__ import annotations

from collections import deque
from enum import Enum
from typing import Deque

from pydantic import BaseModel, Field


# ── Enums ─────────────────────────────────────────────────────────────────────


class SpeakerLabel(str, Enum):
    SPEAKER_A = "speaker_a"
    SPEAKER_B = "speaker_b"


class ArgumentRole(str, Enum):
    ARGUMENT = "argument"
    COUNTERARGUMENT = "counterargument"


class TranscriptWordStatus(str, Enum):
    PARTIAL = "partial"
    FINAL = "final"


# ── Transcript primitives ─────────────────────────────────────────────────────


class TranscriptWord(BaseModel):
    text: str
    start_ms: int = Field(..., description="Word start time in milliseconds.")
    end_ms: int = Field(..., description="Word end time in milliseconds.")
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    status: TranscriptWordStatus = TranscriptWordStatus.PARTIAL


class Turn(BaseModel):
    turn_id: str = Field(..., description="UUID assigned at turn creation.")
    speaker: SpeakerLabel
    words: list[TranscriptWord] = Field(default_factory=list)
    is_final: bool = False

    @property
    def text(self) -> str:
        return " ".join(w.text for w in self.words)

    @property
    def word_count(self) -> int:
        return len(self.words)


# ── Per-speaker rolling buffer ────────────────────────────────────────────────


class SpeakerBuffer(BaseModel):
    speaker: SpeakerLabel
    current_turn: Turn | None = None
    completed_turns: Deque[Turn] = Field(
        default_factory=lambda: deque(maxlen=10),
    )
    last_audio_at: float = 0.0

    model_config = {"arbitrary_types_allowed": True}

    def context_text(self) -> str:
        return "\n".join(t.text for t in self.completed_turns)


# ── Claude output model ───────────────────────────────────────────────────────


class ArgumentUpdate(BaseModel):
    turn_id: str = Field(..., description="The Turn that triggered this generation.")
    speaker: SpeakerLabel
    role: ArgumentRole
    delta: str = Field(..., description="Incremental text token from the stream.")
    is_final: bool = Field(default=False)


# ── Session-level envelope ────────────────────────────────────────────────────


class SessionState(BaseModel):
    session_id: str
    speaker_a: SpeakerBuffer = Field(
        default_factory=lambda: SpeakerBuffer(speaker=SpeakerLabel.SPEAKER_A)
    )
    speaker_b: SpeakerBuffer = Field(
        default_factory=lambda: SpeakerBuffer(speaker=SpeakerLabel.SPEAKER_B)
    )
    transcript: list[Turn] = Field(default_factory=list)
    is_active: bool = True
    hint_speaker: SpeakerLabel = SpeakerLabel.SPEAKER_A
