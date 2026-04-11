"""Claude argument generation service.

Streams two pieces of analysis for each completed speaker turn:
  1. ARGUMENT       — the strongest case FOR the speaker's position.
  2. COUNTERARGUMENT — the strongest case AGAINST it (opponent's POV).

Both are streamed token-by-token so the frontend can render them
progressively in the ArgumentPanel.

Streaming strategy: two sequential ``client.messages.stream()`` calls
(one per role).  Running them sequentially keeps the UI update order
deterministic and avoids the complexity of fan-out queues.

Reference: https://docs.anthropic.com/en/api/messages-streaming
"""

from __future__ import annotations

import logging
from collections.abc import AsyncIterator

import anthropic

from server.config import Settings
from server.models.turn import ArgumentRole, ArgumentUpdate, Turn

logger = logging.getLogger(__name__)

_ARGUMENT_SYSTEM = """\
You are a neutral political analyst. Given a speaker's statement during a political \
conversation, write a concise 2-3 sentence summary of the core argument behind their \
position. Use clear, factual, non-partisan language — no emotional framing, no loaded \
terms. Skip preamble and do not restate the question.\
"""

_COUNTERARGUMENT_SYSTEM = """\
You are an empathetic political commentator. Given a speaker's statement during a \
political conversation, write a concise 2-3 sentence counterpoint that challenges \
their position. Go beyond pure logic — acknowledge the emotional concerns, values, or \
lived experiences that drive the opposing view, and frame your response in a way that \
is genuinely useful to someone seeking to understand why the other side feels the way \
it does. Skip preamble and do not restate the question.\
"""

_USER_TEMPLATE = """\
## {speaker} just said:
"{turn_text}"

## {speaker}'s prior statements (most recent first):
{speaker_context}

## Opponent's prior statements (most recent first):
{opponent_context}

Write the {role} now.\
"""


class ClaudeService:
    """Async wrapper around the Anthropic Messages API with streaming."""

    def __init__(self, settings: Settings) -> None:
        self._model = settings.claude_model
        self._max_tokens = settings.claude_max_tokens
        self._client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    async def generate_arguments(
        self,
        turn: Turn,
        speaker_context: str,
        opponent_context: str,
    ) -> AsyncIterator[ArgumentUpdate]:
        """Stream argument then counterargument deltas for a completed turn.

        Yields ``ArgumentUpdate`` objects with ``is_final=False`` for each
        token and one final ``ArgumentUpdate`` with ``is_final=True`` and
        ``delta=""`` at the end of each role.
        """
        speaker_label = turn.speaker.value.replace("_", " ").title()

        for role, system in (
            (ArgumentRole.ARGUMENT, _ARGUMENT_SYSTEM),
            (ArgumentRole.COUNTERARGUMENT, _COUNTERARGUMENT_SYSTEM),
        ):
            user_prompt = _USER_TEMPLATE.format(
                speaker=speaker_label,
                turn_text=turn.text,
                speaker_context=speaker_context or "(none yet)",
                opponent_context=opponent_context or "(none yet)",
                role=role.value,
            )
            try:
                async for update in self._stream_role(turn, role, system, user_prompt):
                    yield update
            except anthropic.RateLimitError:
                logger.warning(
                    "Claude rate-limit for turn %s role %s", turn.turn_id, role.value
                )
                yield ArgumentUpdate(
                    turn_id=turn.turn_id,
                    speaker=turn.speaker,
                    role=role,
                    delta="[rate-limited — try again shortly]",
                    is_final=True,
                )
            except anthropic.APIError as exc:
                logger.error(
                    "Claude API error for turn %s role %s: %s",
                    turn.turn_id,
                    role.value,
                    exc,
                )
                yield ArgumentUpdate(
                    turn_id=turn.turn_id,
                    speaker=turn.speaker,
                    role=role,
                    delta="[generation error]",
                    is_final=True,
                )

    async def _stream_role(
        self,
        turn: Turn,
        role: ArgumentRole,
        system: str,
        user_prompt: str,
    ) -> AsyncIterator[ArgumentUpdate]:
        """Open a single streaming request and yield one ArgumentUpdate per token."""
        async with self._client.messages.stream(
            model=self._model,
            max_tokens=self._max_tokens,
            system=system,
            messages=[{"role": "user", "content": user_prompt}],
        ) as stream:
            async for token in stream.text_stream:
                yield ArgumentUpdate(
                    turn_id=turn.turn_id,
                    speaker=turn.speaker,
                    role=role,
                    delta=token,
                    is_final=False,
                )

        # Final sentinel: signals the frontend that this role is complete.
        yield ArgumentUpdate(
            turn_id=turn.turn_id,
            speaker=turn.speaker,
            role=role,
            delta="",
            is_final=True,
        )
