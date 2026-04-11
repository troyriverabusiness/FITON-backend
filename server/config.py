from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── Anthropic / Claude ────────────────────────────────────────────────────
    anthropic_api_key: str = ""
    claude_model: str = "claude-opus-4-5"
    claude_max_tokens: int = 120

    # ── Conversation analysis ──────────────────────────────────────────────────
    # Minimum number of words in a turn before it is sent to Claude.
    min_turn_words: int = 3

    # ── Database ──────────────────────────────────────────────────────────────
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/postgres"

    # ── WebSocket / server ────────────────────────────────────────────────────
    audio_sample_rate: int = 16_000

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings singleton."""
    return Settings()
