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
type RecordState = "idle" | "recording" | "processing";

export default function HomePage() {
  const socketRef = useRef<ConversationSocket | null>(null);
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recordState, setRecordState] = useState<RecordState>("idle");

  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);
  const [speakerAUpdates, setSpeakerAUpdates] = useState<ArgumentUpdate[]>([]);
  const [speakerBUpdates, setSpeakerBUpdates] = useState<ArgumentUpdate[]>([]);

  // ── Transcript handler ─────────────────────────────────────────────────────

  const handleTranscript = useCallback((entry: TranscriptEntry) => {
    setTranscriptEntries((prev) => {
      const idx = prev.findIndex((e) => e.turnId === entry.turnId);
      if (idx === -1) return [...prev, entry];
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
    setRecordState("idle");

    const socket = new ConversationSocket(WS_URL, {
      onConnected: () => setStatus("connected"),
      onDisconnected: () => {
        setStatus("idle");
        setRecordState("idle");
        socketRef.current = null;
      },
      onTranscript: handleTranscript,
      onArgumentUpdate: handleArgumentUpdate,
      onTurnComplete: () => {},
      onArgumentComplete: () => {},
      onProcessing: () => setRecordState("processing"),
      onNoSpeech: () => setRecordState("idle"),
      onError: (msg) => {
        setErrorMsg(msg);
        setStatus("error");
        setRecordState("idle");
      },
      onSessionEnded: () => {
        setStatus("idle");
        setRecordState("idle");
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
    setRecordState("idle");
  }

  // ── Recording ──────────────────────────────────────────────────────────────

  function handlePressRecord() {
    if (recordState !== "idle") return;
    socketRef.current?.startRecording();
    setRecordState("recording");
  }

  function handleReleaseRecord() {
    if (recordState !== "recording") return;
    socketRef.current?.stopRecording();
    // stays "processing" until the server responds
  }

  useEffect(() => {
    return () => { socketRef.current?.disconnect().catch(() => {}); };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  const recordLabel =
    recordState === "recording" ? "🎙 Recording… release to send"
    : recordState === "processing" ? "Analysing…"
    : "Hold to record — both speakers";

  const recordColor =
    recordState === "recording" ? "#ff6b6b"
    : recordState === "processing" ? "#f5a623"
    : "#4f9eff";

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

      {isConnected && (
        <div style={styles.recordRow}>
          <div style={styles.statusBar}>
            <span
              style={{
                ...styles.dot,
                background: recordColor,
                animation: recordState === "idle" ? "none" : "pulse 1.4s ease-in-out infinite",
              }}
            />
            <span style={styles.statusLabel}>{recordLabel}</span>
          </div>

          <button
            style={{
              ...styles.recordBtn,
              background: recordState === "recording" ? "#ff6b6b"
                : recordState === "processing" ? "#f5a623"
                : "#4f9eff",
              opacity: recordState === "processing" ? 0.6 : 1,
              cursor: recordState === "processing" ? "default" : "pointer",
            }}
            onMouseDown={handlePressRecord}
            onMouseUp={handleReleaseRecord}
            onMouseLeave={() => { if (recordState === "recording") handleReleaseRecord(); }}
            onTouchStart={(e) => { e.preventDefault(); handlePressRecord(); }}
            onTouchEnd={handleReleaseRecord}
            disabled={recordState === "processing"}
          >
            {recordState === "recording"
              ? "Release to send"
              : recordState === "processing"
              ? "Analysing…"
              : "Hold to record"}
          </button>

          <p style={styles.hint}>
            Both speakers can talk — pyannote detects who said what automatically.
          </p>
        </div>
      )}

      <div style={styles.body}>
        <section style={styles.transcriptSection}>
          <TranscriptPanel entries={transcriptEntries} />
        </section>
        <section style={styles.argumentsSection}>
          <ArgumentPanel speaker="speaker_a" label="Speaker A" updates={speakerAUpdates} />
          <ArgumentPanel speaker="speaker_b" label="Speaker B" updates={speakerBUpdates} />
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
  recordRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flexShrink: 0,
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0,
  },
  statusLabel: {
    fontSize: "0.75rem",
    color: "var(--color-text-muted)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  recordBtn: {
    padding: "0.9rem 1rem",
    borderRadius: "10px",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    transition: "background 0.1s",
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
  },
  hint: {
    fontSize: "0.75rem",
    color: "var(--color-text-muted)",
    margin: 0,
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
