import { useCallback, useRef, useState } from "react";

// ── Types (mirrors client/lib/socket.ts) ─────────────────────────────────────

export type SpeakerLabel = "speaker_a" | "speaker_b";
export type ArgumentRole = "argument" | "counterargument";

export interface ArgumentUpdate {
  turnId: string;
  speaker: SpeakerLabel;
  role: ArgumentRole;
  delta: string;
  isFinal: boolean;
}

export interface TranscriptEntry {
  turnId: string;
  speaker: SpeakerLabel;
  text: string;
  isPartial: boolean;
}

interface ServerMessage {
  type: string;
  speaker?: SpeakerLabel;
  role?: ArgumentRole;
  delta?: string;
  turn_id?: string;
  is_final?: boolean;
  is_partial?: boolean;
  text?: string;
  message?: string;
  tags?: string[];
}

const WS_URL =
  import.meta.env.VITE_BACKEND_WS_URL || "ws://localhost:8000/ws/conversation";

const CHUNK_INTERVAL_MS = 10_000;

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useConversationSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const chunkTimerRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const serverBusyRef = useRef(false);
  const pendingBlobRef = useRef<Blob | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  // Store every argument_update exactly like the working client does.
  const [speakerAUpdates, setSpeakerAUpdates] = useState<ArgumentUpdate[]>([]);
  const [speakerBUpdates, setSpeakerBUpdates] = useState<ArgumentUpdate[]>([]);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  // Emotion tags keyed by turn_id: { [turnId]: string[] }
  const [speakerAEmotions, setSpeakerAEmotions] = useState<Record<string, string[]>>({});
  const [speakerBEmotions, setSpeakerBEmotions] = useState<Record<string, string[]>>({});

  // ── Message handler (matches client/lib/socket.ts _handleMessage) ────────

  const handleMessage = useCallback((raw: string) => {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    switch (msg.type) {
      case "processing":
        setIsProcessing(true);
        break;

      case "no_speech":
        setIsProcessing(false);
        serverBusyRef.current = false;
        break;

      case "transcript":
        setIsProcessing(false);
        setTranscripts((prev) => {
          const entry: TranscriptEntry = {
            turnId: msg.turn_id!,
            speaker: msg.speaker!,
            text: msg.text!,
            isPartial: msg.is_partial ?? false,
          };
          const idx = prev.findIndex((e) => e.turnId === entry.turnId);
          if (idx === -1) return [...prev, entry];
          const next = [...prev];
          next[idx] = entry;
          return next;
        });
        break;

      case "turn_complete":
        break;

      case "argument_update": {
        const update: ArgumentUpdate = {
          turnId: msg.turn_id!,
          speaker: msg.speaker!,
          role: msg.role!,
          delta: msg.delta ?? "",
          isFinal: msg.is_final ?? false,
        };
        // Route to the OPPONENT's panel: the other speaker needs the summary
        // and counter-argument so they are prepared to respond.
        const setter =
          update.speaker === "speaker_a" ? setSpeakerBUpdates : setSpeakerAUpdates;
        setter((prev) => [...prev, update]);
        break;
      }

      case "argument_complete":
        setIsProcessing(false);
        serverBusyRef.current = false;
        break;

      case "emotion_tags": {
        // Route to OPPONENT's panel to match where the argument cards landed.
        const setter =
          msg.speaker === "speaker_a" ? setSpeakerBEmotions : setSpeakerAEmotions;
        setter((prev) => ({ ...prev, [msg.turn_id!]: msg.tags ?? [] }));
        break;
      }

      case "error":
        setMicError(msg.message ?? "Unknown server error");
        serverBusyRef.current = false;
        break;

      case "session_ended":
        setIsConnected(false);
        break;
    }
  }, []);

  // ── WebSocket ────────────────────────────────────────────────────────────

  const openWebSocket = useCallback((): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(WS_URL);
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error("WebSocket connection timed out"));
      }, 10_000);

      ws.onopen = () => {
        clearTimeout(timeout);
        wsRef.current = ws;
        setIsConnected(true);
        resolve(ws);
      };
      ws.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("WebSocket connection failed"));
      };
      ws.onclose = () => {
        setIsConnected(false);
      };
      ws.onmessage = (ev) => handleMessage(ev.data as string);
    });
  }, [handleMessage]);

  // ── Mic ──────────────────────────────────────────────────────────────────

  const initMic = useCallback(async (): Promise<MediaStream> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 16_000,
      },
    });
    micStreamRef.current = stream;
    streamRef.current = stream;
    return stream;
  }, []);

  // ── Blob send (mirrors client/lib/socket.ts _sendBlob) ──────────────────

  const sendBlob = useCallback((blob: Blob) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    serverBusyRef.current = true;
    blob.arrayBuffer().then((buf) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(buf);
    });
  }, []);

  // ── MediaRecorder (mirrors client/lib/socket.ts startRecording/stopRecording)

  const startRecorder = useCallback(() => {
    const stream = streamRef.current;
    if (!stream) return;
    if (recorderRef.current?.state === "recording") return;

    chunksRef.current = [];

    const mimeType =
      (["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((t) =>
        MediaRecorder.isTypeSupported(t),
      )) ?? "";

    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const actualType = recorder.mimeType || mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type: actualType });
      chunksRef.current = [];
      if (blob.size > 0) {
        if (serverBusyRef.current) {
          pendingBlobRef.current = blob;
        } else {
          sendBlob(blob);
        }
      }
    };

    recorderRef.current = recorder;
    recorder.start();
  }, [sendBlob]);

  const stopRecorder = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
  }, []);

  // ── Auto-chunk loop ──────────────────────────────────────────────────────
  // Every CHUNK_INTERVAL_MS: stop current recorder (fires onstop → sends blob
  // if server is free), then immediately start a new one.
  // If server is still busy, blob is held in pendingBlobRef and sent when
  // argument_complete/no_speech clears serverBusyRef.

  const startChunkLoop = useCallback(() => {
    // Flush any pending blob when the server becomes free
    const flushInterval = window.setInterval(() => {
      if (!serverBusyRef.current && pendingBlobRef.current) {
        sendBlob(pendingBlobRef.current);
        pendingBlobRef.current = null;
      }
    }, 500);

    const chunkInterval = window.setInterval(() => {
      stopRecorder();
      startRecorder();
    }, CHUNK_INTERVAL_MS);

    chunkTimerRef.current = chunkInterval;

    return () => {
      clearInterval(chunkInterval);
      clearInterval(flushInterval);
    };
  }, [startRecorder, stopRecorder, sendBlob]);

  const cleanupRef = useRef<(() => void) | null>(null);

  // ── Public API ───────────────────────────────────────────────────────────

  const startSession = useCallback(async (): Promise<MediaStream> => {
    setMicError(null);
    setSpeakerAUpdates([]);
    setSpeakerBUpdates([]);
    setTranscripts([]);
    setSpeakerAEmotions({});
    setSpeakerBEmotions({});
    serverBusyRef.current = false;
    pendingBlobRef.current = null;

    try {
      await openWebSocket();
    } catch (err) {
      setMicError("Could not connect to server");
      throw err;
    }

    let stream: MediaStream;
    try {
      stream = await initMic();
    } catch {
      setMicError("Microphone permission denied");
      throw new Error("Microphone permission denied");
    }

    startRecorder();
    cleanupRef.current = startChunkLoop();
    return stream;
  }, [openWebSocket, initMic, startRecorder, startChunkLoop]);

  const endSession = useCallback(async () => {
    // Stop chunk loop + recorder
    cleanupRef.current?.();
    cleanupRef.current = null;
    stopRecorder();

    // Release mic
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    streamRef.current = null;

    // Send any pending blob, then end_session
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      if (pendingBlobRef.current) {
        const buf = await pendingBlobRef.current.arrayBuffer();
        if (ws.readyState === WebSocket.OPEN) ws.send(buf);
        pendingBlobRef.current = null;
      }

      ws.send(JSON.stringify({ type: "end_session" }));

      // Wait for server to finish processing and send session_ended,
      // or close after a generous timeout.
      const closeTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close(1000, "timeout");
        }
      }, 60_000);

      const origOnMessage = ws.onmessage;
      ws.onmessage = (ev) => {
        if (origOnMessage) origOnMessage.call(ws, ev);
        try {
          const msg = JSON.parse(ev.data as string);
          if (msg.type === "session_ended") {
            clearTimeout(closeTimeout);
            ws.close(1000, "session-ended");
          }
        } catch { /* ignore */ }
      };
    }
    wsRef.current = null;
  }, [stopRecorder]);

  return {
    startSession,
    endSession,
    isConnected,
    isProcessing,
    micError,
    speakerAUpdates,
    speakerBUpdates,
    speakerAEmotions,
    speakerBEmotions,
    transcripts,
  };
}
