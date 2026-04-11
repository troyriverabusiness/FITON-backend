"""Claude argument generation service.

Streams two pieces of analysis for each completed speaker turn:
  1. ARGUMENT       — the strongest case FOR the speaker's position.
  2. COUNTERARGUMENT — the strongest case AGAINST it (opponent's POV).

After both stream, a third non-streaming call extracts emotion tags
(e.g. ["passionate", "defensive"]) that describe how the speaker
delivered the argument.

Streaming strategy: two sequential ``client.messages.stream()`` calls
(one per role).  Running them sequentially keeps the UI update order
deterministic and avoids the complexity of fan-out queues.

Reference: https://docs.anthropic.com/en/api/messages-streaming
"""

from __future__ import annotations

import json
import logging
import re
from collections.abc import AsyncIterator

import anthropic

from server.config import Settings
from server.models.turn import ArgumentRole, ArgumentUpdate, Turn

logger = logging.getLogger(__name__)

_ARGUMENT_SYSTEM = """\
You are a neutral political analyst. Distill the speaker's core argument into exactly \
1-2 sentences. Use precise, plain language — every word must earn its place. No \
preamble, no filler, no restatement. Write so that someone glancing for two seconds \
understands the position instantly.\
"""

_COUNTERARGUMENT_SYSTEM = """\
You are a neutral political analyst. State the strongest opposing argument in exactly \
1-2 sentences. Use precise, plain language — every word must earn its place. No \
preamble, no filler, no restatement. Write so that someone glancing for two seconds \
grasps the challenge instantly.\
"""

_BRIEFING_SYSTEM = """\
You are an empathetic debate coach. Given a topic and a list of counterarguments \
that have been used against this person in past debates, identify the 3–5 most \
recurring argument patterns. For each pattern provide:\
  - "argument": a 1-sentence summary of the logical opposing argument\
  - "emotional_drivers": 2-3 sentences describing the emotions and lived \
    perspectives that make people hold this view — not the logic, but the feeling \
    behind it (fear, identity, distrust, grief, pride, etc.)\
  - "emotion_tags": an array of 2–4 lowercase short labels capturing the \
    emotional tenor of this argument (e.g. ["fearful", "protective", "distrustful"])\
  - "rebuttal": 2–3 sentences that acknowledge the emotional reality first, \
    then offer a substantive counter — do NOT ignore the emotions, address them\
If the past-counterarguments list is empty, generate the 3–5 most common \
arguments people make on this topic from general knowledge.\
Return ONLY valid JSON matching this schema — no prose, no markdown:\
{"patterns": [{"argument": "...", "emotional_drivers": "...", "emotion_tags": ["...", "..."], "rebuttal": "..."}]}\
"""

_BRIEFING_USER_TEMPLATE = """\
## Debate topic:
"{topic}"

## Counterarguments used against me in past debates (one per line):
{counterarguments}

Identify the recurring patterns and generate rebuttals now.\
"""

_TITLE_SYSTEM = """\
You are a debate archivist. Given a conversation transcript, write a concise 4-7 word \
title that captures the main topic or theme debated. \
Return ONLY the title — no quotes, no trailing punctuation, no explanation.\
"""

_TITLE_USER_TEMPLATE = """\
## Debate transcript:
{transcript}

Write the title now.\
"""

_EMOTION_SYSTEM = """\
You are a speech analyst. Given a speaker's statement, return a JSON array of 2-4 \
lowercase single-word or two-word emotion/tone labels that describe how the speaker \
sounds (e.g. ["passionate", "defensive", "personally motivated"]). \
Return only valid JSON — no prose, no markdown.\
"""

_EMOTION_USER_TEMPLATE = """\
## {speaker} just said:
"{turn_text}"

Return the emotion labels as a JSON array.\
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


_FENCE_RE = re.compile(r"^```(?:json)?\s*\n?(.*?)\n?\s*```$", re.DOTALL)


def _strip_markdown_fences(text: str) -> str:
    """Remove ```json ... ``` wrappers that Claude sometimes adds despite instructions."""
    m = _FENCE_RE.match(text.strip())
    return m.group(1).strip() if m else text


class ClaudeService:
    """Async wrapper around the Anthropic Messages API with streaming."""

    def __init__(self, settings: Settings) -> None:
        self._model = settings.claude_model
        self._max_tokens = settings.claude_max_tokens
        self._client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    async def generate_briefing(
        self,
        topic: str,
        counterarguments: list[str],
    ) -> list[dict[str, str]]:
        """Analyse past counterarguments for a topic and return pattern/rebuttal pairs.

        Returns a list of dicts like ``[{"argument": "...", "rebuttal": "..."}]``.
        Falls back to Claude's general knowledge when no past data exists.
        """
        ca_block = "\n".join(f"- {ca}" for ca in counterarguments) if counterarguments else "(none)"
        user_prompt = _BRIEFING_USER_TEMPLATE.format(
            topic=topic,
            counterarguments=ca_block,
        )
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=2048,
                system=_BRIEFING_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw = response.content[0].text.strip()
            logger.debug("Briefing raw response for topic %r: %.200s", topic, raw)
            raw = _strip_markdown_fences(raw)
            data = json.loads(raw)
            patterns = data.get("patterns", [])
            if isinstance(patterns, list):
                return [
                    {
                        "argument": str(p.get("argument", "")),
                        "emotional_drivers": str(p.get("emotional_drivers", "")),
                        "emotion_tags": [str(t) for t in p.get("emotion_tags", []) if t],
                        "rebuttal": str(p.get("rebuttal", "")),
                    }
                    for p in patterns
                    if isinstance(p, dict)
                ]
        except Exception as exc:
            logger.error("Briefing generation failed for topic %r: %s — raw: %.300s", topic, exc, raw if 'raw' in dir() else '(no response)')
        return []

    async def generate_emotions(self, turn: Turn) -> list[str]:
        """Return a list of emotion/tone labels for the speaker's turn.

        Makes a single non-streaming call and parses the JSON array Claude
        returns.  Falls back to an empty list on any error so it never
        blocks the pipeline.
        """
        speaker_label = turn.speaker.value.replace("_", " ").title()
        user_prompt = _EMOTION_USER_TEMPLATE.format(
            speaker=speaker_label,
            turn_text=turn.text,
        )
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=60,
                system=_EMOTION_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw = response.content[0].text.strip()
            tags = json.loads(raw)
            if isinstance(tags, list):
                return [str(t) for t in tags]
        except Exception as exc:
            logger.warning("Emotion extraction failed for turn %s: %s", turn.turn_id, exc)
        return []

    async def generate_title(
        self,
        turns: list[tuple[str, str]],  # (speaker, text) pairs
    ) -> str | None:
        """Return a short title summarising the conversation topic.

        Builds a brief transcript from the first several turns and asks Claude
        for a 4-7 word label.  Falls back to ``None`` on any error so callers
        can degrade gracefully.
        """
        snippet = "\n".join(
            f"{'Speaker A' if spk == 'speaker_a' else 'Speaker B'}: {txt}"
            for spk, txt in turns[:10]
        )
        user_prompt = _TITLE_USER_TEMPLATE.format(transcript=snippet)
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=30,
                system=_TITLE_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            title = response.content[0].text.strip().strip('"').strip("'")
            return title if title else None
        except Exception as exc:
            logger.warning("Title generation failed: %s", exc)
            return None

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
