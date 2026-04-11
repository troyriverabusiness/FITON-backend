"""REST endpoints for browsing saved conversations."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from server.db import async_session
from server.models.db import Conversation, DBTurn

router = APIRouter(prefix="/conversations", tags=["conversations"])


# ── Response schemas ──────────────────────────────────────────────────────────


class TurnOut(BaseModel):
    id: str
    speaker: str
    text: str
    argument_text: str
    counterargument_text: str
    emotion_tags: list[str] | None
    position: int

    model_config = {"from_attributes": True}


class ConversationSummary(BaseModel):
    id: str
    created_at: str
    ended_at: str | None
    turn_count: int


class ConversationDetail(BaseModel):
    id: str
    created_at: str
    ended_at: str | None
    turns: list[TurnOut]


# ── Routes ────────────────────────────────────────────────────────────────────


@router.get("", response_model=list[ConversationSummary])
async def list_conversations():
    """Return all conversations, newest first."""
    async with async_session() as session:
        stmt = (
            select(
                Conversation.id,
                Conversation.created_at,
                Conversation.ended_at,
                func.count(DBTurn.id).label("turn_count"),
            )
            .outerjoin(DBTurn)
            .group_by(Conversation.id)
            .order_by(Conversation.created_at.desc())
        )
        rows = (await session.execute(stmt)).all()

    return [
        ConversationSummary(
            id=str(row.id),
            created_at=row.created_at.isoformat(),
            ended_at=row.ended_at.isoformat() if row.ended_at else None,
            turn_count=row.turn_count,
        )
        for row in rows
    ]


@router.get("/{conversation_id}", response_model=ConversationDetail)
async def get_conversation(conversation_id: str):
    """Return a single conversation with all its turns."""
    try:
        conv_uuid = uuid.UUID(conversation_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid conversation ID")

    async with async_session() as session:
        stmt = (
            select(Conversation)
            .where(Conversation.id == conv_uuid)
            .options(selectinload(Conversation.turns))
        )
        result = await session.execute(stmt)
        conversation = result.scalar_one_or_none()

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return ConversationDetail(
        id=str(conversation.id),
        created_at=conversation.created_at.isoformat(),
        ended_at=conversation.ended_at.isoformat() if conversation.ended_at else None,
        turns=[
            TurnOut(
                id=str(t.id),
                speaker=t.speaker,
                text=t.text,
                argument_text=t.argument_text,
                counterargument_text=t.counterargument_text,
                emotion_tags=t.emotion_tags,
                position=t.position,
            )
            for t in sorted(conversation.turns, key=lambda t: t.position)
        ],
    )
