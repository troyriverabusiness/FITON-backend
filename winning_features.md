# Challenge 03 — Product Concept

## Core Reframe

Most teams will build a policy summarizer. This is not that.

Citizens aren't disengaged because policy is too complex. They're disengaged because the platforms they use reward outrage and hot takes over depth, and because existing civic tools strip out the one thing that makes politics legible: **the conflict.**

This product makes the fight visible. Conflict is the signal, not the noise. And it competes with short-form platforms on their own terms — emotionally compelling, not just informationally complete.

---

## The Feed

Each card leads with an **emotional title** — a plain-language question that captures the actual stakes:

> "Should landlords profit from evictions to list on Airbnb?"

Below it: the official policy name (for credibility), a tension indicator, and a one-line personalized relevance tag based on the user's profile.

Tapping a card opens the full detail view.

---

## The Detail View

One scrollable page, structured as questions a real person would ask:

1. **The fight** — who wants what and why, written in their emotional logic. Not "stakeholders disagree" but what each group actually fears.
2. **What it says** — plain language summary, every claim sourced to the original text.
3. **What this means for you** — personalized to the user's profile (occupation, location, life situation).
4. **What changed** — diff between the draft and the final adopted text, with AI annotation on what got softened, removed, or added and who pushed for it.
5. **Where people stand** — a tension map of stakeholder positions.
6. **Take action** — open EU consultations the user can respond to, their MEP's voting record on this topic, one-click message draft to their representative.

---

## Key Differentiators

**Emotional framing over neutral summarization**
The same policy feels different depending on what you stand to lose. The product writes from inside each position, not above it.

**Conflict as a feature**
Each policy has a tension score — how contested is this really? High tension signals genuine disagreement worth forming a view on. Low tension signals political theater.

**The draft-to-final diff**
The gap between what was proposed and what passed is where lobbying lives. Surfacing this with AI annotation is journalism-grade civic intelligence no other team will build in a hackathon.

**Depth that competes with hot takes**
The feed card format is designed to hook with a question, not a title. The detail view is structured so every section answers something, not files something.

**Closes the loop**
Every other tool stops at comprehension. This one ends with action — consultations, MEP contact, participation. That's the brief's actual ask.

**Credibility layer**
Every AI-generated claim links back to its source sentence. Media divergence is flagged. The product teaches users not to fully trust it — which is what makes them trust it.

---

## User Profile (onboarding, 5 fields)

- Age range
- Country / region
- Occupation category (student, employee, freelancer, SME owner, retiree)
- Life situations (renting, has children, EU migrant, small business, etc.)
- Interest areas (housing, climate, digital rights, healthcare, etc.)

Same policy, different profile = different "what this means for you" card. This is the personalization layer, but it's in service of the emotional/conflict framing, not a replacement for it.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Scraping | EP Open Data API + EUR-Lex + Firecrawl |
| Database | Supabase Postgres |
| Backend | FastAPI |
| AI | Claude (Anthropic API, structured outputs via Pydantic) |
| Frontend | Next.js + shadcn |
| Scheduling | n8n (daily scrape workflow) |

---

## The Pitch Line

*"Every civic tool treats citizens like they need more information. But political engagement has always been emotional. We didn't build a summarizer — we built something that makes the fight visible, because that's what actually gets people to care."*