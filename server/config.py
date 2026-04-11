from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── Anthropic / Claude ────────────────────────────────────────────────────
    anthropic_api_key: str = ""
    claude_model: str = "claude-opus-4-5"
    claude_max_tokens: int = 512

    # ── Conversation analysis ──────────────────────────────────────────────────
    # Minimum number of words in a turn before it is sent to Claude.
    min_turn_words: int = 3

    # ── Speaker diarization (pyannote.audio) ──────────────────────────────────
    # HuggingFace token — required to download pyannote/speaker-diarization-3.1.
    # Create one at huggingface.co/settings/tokens (read access).
    # Accept model terms at:
    #   huggingface.co/pyannote/speaker-diarization-3.1
    #   huggingface.co/pyannote/segmentation-3.0
    #   huggingface.co/pyannote/embedding
    hf_token: str = ""

    # ── WebSocket / server ────────────────────────────────────────────────────
    audio_sample_rate: int = 16_000
    max_sessions: int = 50

    # ── Existing FITON DB (kept for compatibility) ────────────────────────────
    postgres_user: str = "fiton"
    postgres_password: str = "fiton"
    postgres_db: str = "fiton"
    secret_key: str = "changeme"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings singleton."""
    return Settings()
