"use client";

import { useEffect, useRef } from "react";
import type { SpeakerLabel, TranscriptEntry } from "@/lib/socket";

interface TranscriptPanelProps {
  entries: TranscriptEntry[];
}

export function TranscriptPanel({ entries }: TranscriptPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever entries change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Live Transcript</h2>
      <div style={styles.scroll}>
        {entries.length === 0 && (
          <p style={styles.empty}>
            Transcript will appear here once the session starts…
          </p>
        )}
        {entries.map((entry) => (
          <TurnBlock key={entry.turnId} entry={entry} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────────

interface TurnBlockProps {
  entry: TranscriptEntry;
}

function TurnBlock({ entry }: TurnBlockProps) {
  const speakerColor =
    entry.speaker === "speaker_a"
      ? "var(--color-speaker-a)"
      : entry.speaker === "speaker_b"
        ? "var(--color-speaker-b)"
        : "var(--color-text-muted)";

  const label =
    entry.speaker === "speaker_a"
      ? "Speaker A"
      : entry.speaker === "speaker_b"
        ? "Speaker B"
        : "…";

  return (
    <div style={{ ...styles.turn, borderLeftColor: speakerColor }}>
      {entry.speaker !== "unknown" && (
        <span style={{ ...styles.speakerLabel, color: speakerColor }}>
          {label}
        </span>
      )}
      <p style={styles.turnText}>
        {entry.text}
        {entry.isPartial && <span style={styles.cursor}>▋</span>}
      </p>
    </div>
  );
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
  heading: {
    padding: "0.875rem 1.25rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--color-text-muted)",
    borderBottom: "1px solid var(--color-border)",
    flexShrink: 0,
  },
  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
  },
  empty: {
    color: "var(--color-text-muted)",
    fontSize: "0.875rem",
    fontStyle: "italic",
  },
  turn: {
    borderLeft: "3px solid transparent",
    paddingLeft: "0.75rem",
  },
  speakerLabel: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.2rem",
  },
  turnText: {
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--color-text-primary)",
  },
  cursor: {
    display: "inline-block",
    marginLeft: "2px",
    animation: "blink 1s step-end infinite",
    color: "var(--color-text-muted)",
    fontSize: "0.875em",
    verticalAlign: "text-bottom",
  },
};
