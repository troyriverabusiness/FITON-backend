"""General-purpose debate coach chat endpoint.

Accepts a conversation history plus a new user message and returns
a reply from a debate-specialist Claude agent.
"""

from __future__ import annotations

import logging

import anthropic
from fastapi import APIRouter
from pydantic import BaseModel

from server.config import get_settings

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])

_CHAT_SYSTEM = """\
You are a sharp, opinionated debate coach and critical-thinking specialist embedded \
in FITON — a real-time argument recorder. Help the user prepare arguments, dissect \
logical fallacies, find weaknesses in their reasoning, anticipate counterarguments, \
and think through controversial topics with rigour. Be direct, concise, and \
intellectually honest. Do not hedge unnecessarily.\
"""


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str


@router.post("", response_model=ChatResponse)
async def chat(body: ChatRequest) -> ChatResponse:
    """Return a reply from the debate-coach agent."""
    settings = get_settings()
    client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    messages = [{"role": m.role, "content": m.content} for m in body.history]
    messages.append({"role": "user", "content": body.message})

    try:
        response = await client.messages.create(
            model=settings.claude_model,
            max_tokens=1024,
            system=_CHAT_SYSTEM,
            messages=messages,
        )
        return ChatResponse(reply=response.content[0].text)
    except Exception as exc:
        logger.error("Chat generation failed: %s", exc)
        return ChatResponse(reply="Sorry, I couldn't generate a response right now.")
