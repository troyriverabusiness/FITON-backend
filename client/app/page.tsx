"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArgumentPanel } from "@/components/ArgumentPanel/ArgumentPanel";
import { TranscriptPanel } from "@/components/TranscriptPanel/TranscriptPanel";
import {
  ConversationSocket,
  type ArgumentUpdate,
  type SpeakerLabel,
  type TranscriptEntry,
} from "@/lib/socket";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws/conversation";

type SessionStatus = "idle" | "connecting" | "connected" | "error";

export default function HomePage() {
  const socketRef = useRef<ConversationSocket | null>(null);
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Transcript entries keyed by turnId — replaced in-place when final arrives.
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>(
    []
  );

  // Argument updates per speaker (accumulated; panels accumulate internally).
  const [speakerAUpdates, setSpeakerAUpdates] = useState<ArgumentUpdate[]>([]);
  const [speakerBUpdates, setSpeakerBUpdates] = useState<ArgumentUpdate[]>([]);

  // ── Transcript handler ─────────────────────────────────────────────────────

  const handleTranscript = useCallback((entry: TranscriptEntry) => {
    setTranscriptEntries((prev) => {
      const idx = prev.findIndex((e) => e.turnId === entry.turnId);
      if (idx === -1) {
        // New turn — append.
        return [...prev, entry];
      }
      // Replace the existing entry (partial → final, or partial → updated partial).
      const next = [...prev];
      next[idx] = entry;
      return next;
    });
  }, []);

  // ── Argument update handler ────────────────────────────────────────────────

  const handleArgumentUpdate = useCallback((update: ArgumentUpdate) => {
    const setter =
      update.speaker === "speaker_a" ? setSpeakerAUpdates : setSpeakerBUpdates;
    setter((prev) => [...prev, update]);
  }, []);

  // ── Session lifecycle ──────────────────────────────────────────────────────

  async function handleStartSession() {
    setStatus("connecting");
    setErrorMsg(null);
    setTranscriptEntries([]);
    setSpeakerAUpdates([]);
    setSpeakerBUpdates([]);

    const socket = new ConversationSocket(WS_URL, {
      onConnected: () => setStatus("connected"),
      onDisconnected: () => {
        setStatus("idle");
        socketRef.current = null;
      },
      onTranscript: handleTranscript,
      onArgumentUpdate: handleArgumentUpdate,
      onTurnComplete: (_speaker, _turnId) => {
        // No-op: UI updates happen via argument_update events.
      },
      onArgumentComplete: (_speaker, _turnId) => {
        // No-op: panels lock themselves when isFinal=true.
      },
      onError: (msg) => {
        setErrorMsg(msg);
        setStatus("error");
      },
      onSessionEnded: () => {
        setStatus("idle");
        socketRef.current = null;
      },
    });

    socketRef.current = socket;

    try {
      await socket.connect();
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
      socketRef.current = null;
    }
  }

  async function handleEndSession() {
    if (socketRef.current) {
      await socketRef.current.disconnect();
      socketRef.current = null;
    }
    setStatus("idle");
  }

  // Clean up on unmount.
  useEffect(() => {
    return () => {
      socketRef.current?.disconnect().catch(() => {});
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>Conversation Analysis</h1>

        <div style={styles.controls}>
          {errorMsg && <span style={styles.errorBadge}>{errorMsg}</span>}

          {!isConnected && !isConnecting ? (
            <button style={styles.btnStart} onClick={handleStartSession}>
              Start Session
            </button>
          ) : isConnecting ? (
            <button style={{ ...styles.btnStart, opacity: 0.6 }} disabled>
              Connecting…
            </button>
          ) : (
            <button style={styles.btnEnd} onClick={handleEndSession}>
              End Session
            </button>
          )}
        </div>
      </header>

      {/* Recording indicator */}
      {isConnected && (
        <div style={styles.recordingBar}>
          <span style={styles.recordingDot} />
          <span style={styles.recordingLabel}>Recording — speak now</span>
        </div>
      )}

      <div style={styles.body}>
        <section style={styles.transcriptSection}>
          <TranscriptPanel entries={transcriptEntries} />
        </section>

        <section style={styles.argumentsSection}>
          <ArgumentPanel
            speaker="speaker_a"
            label="Speaker A"
            updates={speakerAUpdates}
          />
          <ArgumentPanel
            speaker="speaker_b"
            label="Speaker B"
            updates={speakerBUpdates}
          />
        </section>
      </div>
    </main>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    padding: "1.5rem",
    gap: "1rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  errorBadge: {
    fontSize: "0.8rem",
    color: "#ff6b6b",
    maxWidth: "360px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  btnStart: {
    padding: "0.5rem 1.25rem",
    borderRadius: "8px",
    border: "none",
    background: "#4f9eff",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "opacity 0.15s",
  },
  btnEnd: {
    padding: "0.5rem 1.25rem",
    borderRadius: "8px",
    border: "none",
    background: "#ff6b6b",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  recordingBar: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexShrink: 0,
  },
  recordingDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#ff6b6b",
    animation: "pulse 1.4s ease-in-out infinite",
    display: "inline-block",
  },
  recordingLabel: {
    fontSize: "0.75rem",
    color: "var(--color-text-muted)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "1.25rem",
    minHeight: 0,
  },
  transcriptSection: {
    flex: "0 0 38%",
    minHeight: 0,
  },
  argumentsSection: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    minHeight: 0,
  },
};
