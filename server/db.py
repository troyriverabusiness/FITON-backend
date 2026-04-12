"""Async SQLAlchemy engine and session factory."""

from __future__ import annotations

import logging

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from server.config import get_settings
from server.models.db import Base

logger = logging.getLogger(__name__)

_settings = get_settings()

engine = create_async_engine(_settings.database_url, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def init_db() -> None:
    """Create all tables if they don't already exist."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        # Add title column to existing tables that predate this field.
        await conn.execute(
            text(
                "ALTER TABLE conversations ADD COLUMN IF NOT EXISTS "
                "title VARCHAR(200)"
            )
        )
        # Add confidence columns to turns table.
        await conn.execute(
            text(
                "ALTER TABLE turns ADD COLUMN IF NOT EXISTS "
                "emotion_confidence JSON"
            )
        )
        await conn.execute(
            text(
                "ALTER TABLE turns ADD COLUMN IF NOT EXISTS "
                "argument_confidence JSON"
            )
        )
    logger.info("Database tables ensured")
