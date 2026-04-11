"use client";

import { useMemo } from "react";
import type { ArgumentUpdate, SpeakerLabel } from "@/lib/socket";

interface ArgumentPanelProps {
  speaker: SpeakerLabel;
  label: string;
  updates: ArgumentUpdate[];
}

export function ArgumentPanel({ speaker, label, updates }: ArgumentPanelProps) {
  const speakerColor =
    speaker === "speaker_a"
      ? "var(--color-speaker-a)"
      : "var(--color-speaker-b)";

  const { argumentText, counterText, isArgumentFinal, isCounterFinal } =
    useMemo(() => _accumulateUpdates(updates), [updates]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{ ...styles.headerLabel, color: speakerColor }}>
          {label}
        </span>
        <span style={styles.headerSub}>Argument Analysis</span>
      </div>

      <div style={styles.body}>
        <Section
          title="Argument"
          text={argumentText}
          isFinal={isArgumentFinal}
          accentColor={speakerColor}
          emptyLabel="Waiting for argument…"
        />

        <div style={styles.divider} />

        <Section
          title="Counterargument"
          text={counterText}
          isFinal={isCounterFinal}
          accentColor="var(--color-text-muted)"
          emptyLabel="Waiting for counterargument…"
        />
      </div>
    </div>
  );
}

// ── Section sub-component ──────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  text: string;
  isFinal: boolean;
  accentColor: string;
  emptyLabel: string;
}

function Section({ title, text, isFinal, accentColor, emptyLabel }: SectionProps) {
  return (
    <div style={styles.section}>
      <h3 style={{ ...styles.sectionTitle, color: accentColor }}>{title}</h3>
      {text ? (
        <p style={styles.sectionText}>
          {text}
          {!isFinal && <span style={styles.cursor}>▋</span>}
        </p>
      ) : (
        <p style={styles.emptyText}>{emptyLabel}</p>
      )}
    </div>
  );
}

// ── Accumulator ───────────────────────────────────────────────────────────────

interface AccumulatedState {
  argumentText: string;
  counterText: string;
  isArgumentFinal: boolean;
  isCounterFinal: boolean;
}

/**
 * Groups updates by (turnId, role).
 * When a new turnId appears for a role, that role's text is reset.
 * Concatenates deltas in arrival order for the current turnId.
 * Sets isFinal = true when an update with isFinal === true is received.
 */
function _accumulateUpdates(updates: ArgumentUpdate[]): AccumulatedState {
  let argumentText = "";
  let counterText = "";
  let isArgumentFinal = true;
  let isCounterFinal = true;

  let argumentTurnId = "";
  let counterTurnId = "";

  for (const u of updates) {
    if (u.role === "argument") {
      if (u.turnId !== argumentTurnId) {
        // New turn — reset.
        argumentText = "";
        isArgumentFinal = false;
        argumentTurnId = u.turnId;
      }
      argumentText += u.delta;
      if (u.isFinal) isArgumentFinal = true;
    } else {
      if (u.turnId !== counterTurnId) {
        counterText = "";
        isCounterFinal = false;
        counterTurnId = u.turnId;
      }
      counterText += u.delta;
      if (u.isFinal) isCounterFinal = true;
    }
  }

  return { argumentText, counterText, isArgumentFinal, isCounterFinal };
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    background: "var(--color-surface)",
    borderRadius: "12px",
    border: "1px solid var(--color-border)",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    padding: "0.875rem 1.25rem",
    borderBottom: "1px solid var(--color-border)",
    flexShrink: 0,
  },
  headerLabel: {
    fontSize: "0.875rem",
    fontWeight: 700,
  },
  headerSub: {
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--color-text-muted)",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  section: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingBlock: "0.75rem",
  },
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  sectionText: {
    fontSize: "0.9rem",
    lineHeight: 1.7,
    color: "var(--color-text-primary)",
  },
  emptyText: {
    fontSize: "0.875rem",
    color: "var(--color-text-muted)",
    fontStyle: "italic",
  },
  cursor: {
    display: "inline-block",
    marginLeft: "1px",
    animation: "blink 1s step-end infinite",
    color: "var(--color-text-muted)",
    fontSize: "0.85em",
    verticalAlign: "text-bottom",
  },
  divider: {
    height: "1px",
    background: "var(--color-border)",
    flexShrink: 0,
  },
};
