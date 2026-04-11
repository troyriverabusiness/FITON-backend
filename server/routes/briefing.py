"""Pre-session debate briefing endpoint.

Mines past counterarguments from the turns table and asks Claude to
cluster them into recurring patterns with ready-made rebuttals.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select

from server.config import get_settings
from server.db import async_session
from server.models.db import DBTurn
from server.services.claude import ClaudeService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/briefing", tags=["briefing"])


# ── Request / Response schemas ─────────────────────────────────────────────────


class BriefingRequest(BaseModel):
    topic: str


class PatternOut(BaseModel):
    argument: str
    emotional_drivers: str
    emotion_tags: list[str]
    rebuttal: str


class BriefingOut(BaseModel):
    topic: str
    patterns: list[PatternOut]
    past_data_count: int


# ── Route ──────────────────────────────────────────────────────────────────────


@router.post("", response_model=BriefingOut)
async def generate_briefing(body: BriefingRequest):
    """Return recurring argument patterns and rebuttals for a debate topic."""

    # Pull every counterargument ever generated against Speaker A.
    async with async_session() as session:
        stmt = (
            select(DBTurn.counterargument_text)
            .where(DBTurn.speaker == "speaker_a")
            .where(DBTurn.counterargument_text != "")
        )
        rows = (await session.execute(stmt)).scalars().all()

    counterarguments: list[str] = [text for text in rows if text and text.strip()]

    settings = get_settings()
    claude = ClaudeService(settings)
    patterns = await claude.generate_briefing(body.topic, counterarguments)

    return BriefingOut(
        topic=body.topic,
        patterns=[PatternOut(**p) for p in patterns],
        past_data_count=len(counterarguments),
    )
