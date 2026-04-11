from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── ElevenLabs ────────────────────────────────────────────────────────────
    elevenlabs_api_key: str = ""
    # Scribe v2 Realtime model identifier (confirmed from ElevenLabs API docs).
    elevenlabs_scribe_model: str = "scribe_v2_realtime"
    # Silence threshold sent to Scribe's VAD — commits a segment after this
    # many seconds of silence within the audio stream.
    scribe_vad_silence_secs: float = 1.5

    # ── Anthropic / Claude ────────────────────────────────────────────────────
    anthropic_api_key: str = ""
    claude_model: str = "claude-opus-4-5"
    claude_max_tokens: int = 512

    # ── Conversation analysis ──────────────────────────────────────────────────
    # Seconds of silence (after the last Scribe commit) before Claude is called.
    silence_timeout_seconds: float = 1.5
    # Minimum number of words in a turn before it is sent to Claude.
    min_turn_words: int = 3

    # ── WebSocket / server ────────────────────────────────────────────────────
    # Raw PCM audio expected from the browser: 16 kHz, 16-bit, mono.
    audio_sample_rate: int = 16_000
    audio_channels: int = 1
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
