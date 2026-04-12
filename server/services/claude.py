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

_ARGUMENT_CONFIDENCE_SYSTEM = """\
You are a quality auditor for AI argument analysis. Given a speaker's statement and \
the two AI-generated summaries (argument and counterargument), rate how confidently \
the AI could extract each from the actual speech. Consider:
  - Clarity: did the speaker state a clear position?
  - Completeness: was the speaker's reasoning actually present?
  - Ambiguity: could the speech be interpreted multiple ways?
  - Relevance: are the summaries grounded in what was said vs. assumed?

Score each 0–100:
  90–100  Speaker's position is unambiguous; summary is a faithful distillation
  70–89   Mostly clear with minor gaps or inferences
  40–69   Partially clear; meaningful interpretation was required
  0–39    Very vague, off-topic, or fragmented speech; summary is largely inferred

Return ONLY valid JSON — no prose, no markdown:
{"argument": <int 0-100>, "counterargument": <int 0-100>}\
"""

_ARGUMENT_CONFIDENCE_USER_TEMPLATE = """\
## Speaker said:
"{turn_text}"

## AI extracted argument:
"{argument_text}"

## AI extracted counterargument:
"{counterargument_text}"

Rate confidence now.\
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
  - "confidence": integer 0–100 — how confident you are that this pattern is \
    genuinely prevalent and well-supported by the data (or general knowledge if \
    no past data). 90–100 = very common / well-evidenced; 60–89 = moderately \
    common; 0–59 = speculative or rarely encountered\
If the past-counterarguments list is empty, generate the 3–5 most common \
arguments people make on this topic from general knowledge.\
Return ONLY valid JSON matching this schema — no prose, no markdown:\
{"patterns": [{"argument": "...", "emotional_drivers": "...", "emotion_tags": ["...", "..."], "rebuttal": "...", "confidence": 85}]}\
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
objects, each with a lowercase single-word or two-word emotion/tone label and a \
confidence score (0–100) indicating how clearly that emotion comes through. \
Example: [{"tag": "passionate", "confidence": 88}, {"tag": "defensive", "confidence": 72}] \
Return only valid JSON — no prose, no markdown.\
"""

_MEDIATION_SYSTEM = """\
You are an AI mediator silently observing a live conversation. Analyze the recent \
exchange and decide if you need to intervene. Intervene ONLY when you detect a clear \
pattern — do not intervene on healthy debate or normal disagreement:

  - off_topic: The conversation has drifted significantly from its original subject.
  - escalating: Tone is becoming hostile, aggressive, or personally attacking.
  - emotional: One or both speakers are showing strong distress that may block \
    productive dialogue.

If no intervention is needed, return exactly the JSON null.

If intervention IS needed, return a JSON object with these fields:
  - "trigger": one of "off_topic", "escalating", "emotional"
  - "severity": "low" (gentle nudge) or "high" (urgent redirect)
  - "message": 1-2 sentences — empathetic, non-lecturing, constructive. \
    Encourage understanding, not compliance.

Return ONLY valid JSON (the object or null) — no prose, no markdown.\
"""

_MEDIATION_USER_TEMPLATE = """\
## Recent conversation ({n} turns):
{transcript}

## Recent emotion signals per turn:
{emotions}

Does this conversation need mediation?\
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
    ) -> list[dict[str, object]]:
        """Analyse past counterarguments for a topic and return pattern/rebuttal pairs.

        Returns a list of dicts like ``[{"argument": "...", "rebuttal": "...", "confidence": 85}]``.
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
                        "confidence": int(p["confidence"]) if isinstance(p.get("confidence"), (int, float)) else None,
                    }
                    for p in patterns
                    if isinstance(p, dict)
                ]
        except Exception as exc:
            logger.error("Briefing generation failed for topic %r: %s — raw: %.300s", topic, exc, raw if 'raw' in dir() else '(no response)')
        return []

    async def generate_emotions(self, turn: Turn) -> list[dict[str, object]]:
        """Return a list of emotion/tone labels with confidence scores for the speaker's turn.

        Each item is ``{"tag": "passionate", "confidence": 88}`` (confidence 0–100).
        Falls back to an empty list on any error so it never blocks the pipeline.
        """
        speaker_label = turn.speaker.value.replace("_", " ").title()
        user_prompt = _EMOTION_USER_TEMPLATE.format(
            speaker=speaker_label,
            turn_text=turn.text,
        )
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=120,
                system=_EMOTION_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw = response.content[0].text.strip()
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                result: list[dict[str, object]] = []
                for item in parsed:
                    if isinstance(item, dict) and "tag" in item:
                        result.append({
                            "tag": str(item["tag"]),
                            "confidence": int(item["confidence"]) if isinstance(item.get("confidence"), (int, float)) else None,
                        })
                    elif isinstance(item, str):
                        # Graceful fallback if model returns plain strings.
                        result.append({"tag": item, "confidence": None})
                return result
        except Exception as exc:
            logger.warning("Emotion extraction failed for turn %s: %s", turn.turn_id, exc)
        return []

    async def generate_argument_confidence(
        self,
        turn: Turn,
        argument_text: str,
        counterargument_text: str,
    ) -> dict[str, int | None]:
        """Rate AI confidence (0–100) in the argument and counterargument extractions.

        Returns ``{"argument": 85, "counterargument": 72}`` or ``None`` values on failure.
        """
        user_prompt = _ARGUMENT_CONFIDENCE_USER_TEMPLATE.format(
            turn_text=turn.text,
            argument_text=argument_text or "(none generated)",
            counterargument_text=counterargument_text or "(none generated)",
        )
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=40,
                system=_ARGUMENT_CONFIDENCE_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw = response.content[0].text.strip()
            raw = _strip_markdown_fences(raw)
            parsed = json.loads(raw)
            if isinstance(parsed, dict):
                return {
                    "argument": int(parsed["argument"]) if isinstance(parsed.get("argument"), (int, float)) else None,
                    "counterargument": int(parsed["counterargument"]) if isinstance(parsed.get("counterargument"), (int, float)) else None,
                }
        except Exception as exc:
            logger.warning("Argument confidence rating failed for turn %s: %s", turn.turn_id, exc)
        return {"argument": None, "counterargument": None}

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

    async def generate_mediation(
        self,
        recent_turns: list[tuple[str, str]],  # (speaker, text) pairs
        emotion_signals: list[tuple[str, list[str]]],  # (speaker, tags) pairs
    ) -> dict | None:
        """Analyse recent conversation turns and return a mediation alert if needed.

        Returns a dict like ``{"trigger": "escalating", "severity": "high",
        "message": "..."}`` or ``None`` if no intervention is needed.
        """
        transcript_block = "\n".join(
            f"{'Speaker A' if spk == 'speaker_a' else 'Speaker B'}: {txt}"
            for spk, txt in recent_turns
        )
        emotions_block = "\n".join(
            f"{'Speaker A' if spk == 'speaker_a' else 'Speaker B'}: {', '.join(tags) or '(none)'}"
            for spk, tags in emotion_signals
        ) or "(none recorded yet)"

        user_prompt = _MEDIATION_USER_TEMPLATE.format(
            n=len(recent_turns),
            transcript=transcript_block,
            emotions=emotions_block,
        )
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=200,
                system=_MEDIATION_SYSTEM,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw = response.content[0].text.strip()
            raw = _strip_markdown_fences(raw)
            parsed = json.loads(raw)
            if parsed is None:
                return None
            if isinstance(parsed, dict) and "trigger" in parsed and "message" in parsed:
                return {
                    "trigger": str(parsed["trigger"]),
                    "severity": str(parsed.get("severity", "low")),
                    "message": str(parsed["message"]),
                }
        except Exception as exc:
            logger.warning("Mediation check failed: %s", exc)
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
