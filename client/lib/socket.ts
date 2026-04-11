/**
 * ConversationSocket — manages the WebSocket connection to the server and
 * captures microphone audio for forwarding.
 *
 * Audio pipeline:
 *   getUserMedia → MediaRecorder (webm/opus)
 *   → user holds record button → chunks accumulated
 *   → user releases → complete Blob → ArrayBuffer → binary WebSocket frame
 *   → server → pyannote diarization → faster-whisper transcription → Claude
 *
 * Server → browser message types:
 *   processing       — audio received, being analysed
 *   no_speech        — nothing detected in the recording
 *   transcript       — diarized + transcribed segment per speaker
 *   turn_complete    — a speaker turn was finalised
 *   argument_update  — streaming token from Claude
 *   argument_complete — Claude finished for this turn
 *   error            — server-side error string
 *   session_ended    — graceful session close
 */

// ── Shared types ───────────────────────────────────────────────────────────────

export type SpeakerLabel = "speaker_a" | "speaker_b" | "unknown";
export type ArgumentRole = "argument" | "counterargument";

export interface TranscriptEntry {
  turnId: string;
  speaker: SpeakerLabel;
  text: string;
  isPartial: boolean;
}

export interface ArgumentUpdate {
  turnId: string;
  speaker: SpeakerLabel;
  role: ArgumentRole;
  delta: string;
  isFinal: boolean;
}

// ── Internal server message shapes ────────────────────────────────────────────

interface ServerProcessingMsg   { type: "processing" }
interface ServerNoSpeechMsg     { type: "no_speech" }
interface ServerTranscriptMsg   {
  type: "transcript";
  speaker: SpeakerLabel; text: string; is_partial: boolean; turn_id: string;
}
interface ServerTurnCompleteMsg { type: "turn_complete"; speaker: SpeakerLabel; turn_id: string }
interface ServerArgumentUpdateMsg {
  type: "argument_update";
  speaker: SpeakerLabel; role: ArgumentRole;
  delta: string; turn_id: string; is_final: boolean;
}
interface ServerArgumentCompleteMsg { type: "argument_complete"; speaker: SpeakerLabel; turn_id: string }
interface ServerErrorMsg        { type: "error"; message: string }
interface ServerSessionEndedMsg { type: "session_ended" }

type ServerMessage =
  | ServerProcessingMsg
  | ServerNoSpeechMsg
  | ServerTranscriptMsg
  | ServerTurnCompleteMsg
  | ServerArgumentUpdateMsg
  | ServerArgumentCompleteMsg
  | ServerErrorMsg
  | ServerSessionEndedMsg;

// ── Callbacks ─────────────────────────────────────────────────────────────────

export interface ConversationCallbacks {
  onTranscript?: (entry: TranscriptEntry) => void;
  onArgumentUpdate?: (update: ArgumentUpdate) => void;
  onArgumentComplete?: (speaker: SpeakerLabel, turnId: string) => void;
  onTurnComplete?: (speaker: SpeakerLabel, turnId: string) => void;
  onProcessing?: () => void;
  onNoSpeech?: () => void;
  onError?: (message: string) => void;
  onSessionEnded?: () => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

// ── ConversationSocket ────────────────────────────────────────────────────────

export class ConversationSocket {
  private ws: WebSocket | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private micStream: MediaStream | null = null;

  private readonly wsUrl: string;
  private readonly callbacks: ConversationCallbacks;

  constructor(wsUrl: string, callbacks: ConversationCallbacks = {}) {
    this.wsUrl = wsUrl;
    this.callbacks = callbacks;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  async connect(): Promise<void> {
    await this._openWebSocket();
    // Request mic permission up front so there's no delay on first hold.
    await this._initMic();
  }

  async disconnect(): Promise<void> {
    this.stopRecording();
    this._releaseMic();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "end_session" }));
      await new Promise<void>((resolve) => setTimeout(resolve, 300));
      this.ws.close(1000, "user-disconnect");
    }
    this.ws = null;
  }

  // ── Recording ──────────────────────────────────────────────────────────────

  /** Start capturing audio. Call when the user presses the record button. */
  startRecording(): void {
    if (!this.micStream) {
      console.warn("[Socket] startRecording called but no mic stream");
      return;
    }
    if (this.mediaRecorder?.state === "recording") return;

    this.chunks = [];

    // Pick the best supported MIME type in priority order.
    // Chrome/Firefox support webm/opus; Safari/iOS only support mp4/aac.
    // Falling back to "" lets the browser choose its own default so
    // MediaRecorder never throws on construction.
    const mimeType = (
      ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]
        .find((t) => MediaRecorder.isTypeSupported(t))
    ) ?? "";

    console.log("[Socket] Recording started — mimeType:", mimeType || "(browser default)");
    const recorder = new MediaRecorder(
      this.micStream,
      mimeType ? { mimeType } : undefined,
    );

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    recorder.onstop = () => {
      // Use the recorder's actual mimeType (may differ from what we requested
      // if the browser overrode it) so the Blob type matches the byte content.
      const actualType = recorder.mimeType || mimeType || "audio/webm";
      const blob = new Blob(this.chunks, { type: actualType });
      console.log("[Socket] Recording stopped —", (blob.size / 1024).toFixed(1), "KB, type:", actualType, "sending…");
      this.chunks = [];
      this._sendBlob(blob);
    };

    this.mediaRecorder = recorder;
    recorder.start();
  }

  /** Stop capturing and send the recording. Call on button release. */
  stopRecording(): void {
    if (this.mediaRecorder?.state === "recording") {
      console.log("[Socket] Stopping recording…");
      this.mediaRecorder.stop();
    }
    this.mediaRecorder = null;
  }

  get isRecording(): boolean {
    return this.mediaRecorder?.state === "recording";
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private async _openWebSocket(): Promise<void> {
    console.log("[Socket] Connecting to", this.wsUrl);
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.wsUrl);
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error("WebSocket connection timed out"));
      }, 10_000);

      ws.onopen = () => {
        clearTimeout(timeout);
        this.ws = ws;
        console.log("[Socket] Connected");
        this.callbacks.onConnected?.();
        resolve();
      };
      ws.onerror = (ev) => {
        clearTimeout(timeout);
        console.error("[Socket] Connection error", ev);
        reject(new Error("WebSocket connection failed"));
      };
      ws.onclose = (ev) => {
        console.log("[Socket] Closed — code:", ev.code, "reason:", ev.reason);
        this.callbacks.onDisconnected?.();
      };
      ws.onmessage = (ev) => this._handleMessage(ev.data as string);
    });
  }

  private async _initMic(): Promise<void> {
    console.log("[Socket] Requesting microphone…");
    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16_000,
        },
      });
      console.log("[Socket] Microphone granted");
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone permission denied. Please allow mic access and try again."
          : `Could not access microphone: ${(err as Error).message}`;
      console.error("[Socket] Mic error:", msg);
      this.callbacks.onError?.(msg);
      throw new Error(msg);
    }
  }

  private _releaseMic(): void {
    this.micStream?.getTracks().forEach((t) => t.stop());
    this.micStream = null;
    console.log("[Socket] Microphone released");
  }

  private _sendBlob(blob: Blob): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[Socket] Cannot send — WebSocket not open");
      return;
    }
    console.log("[Socket] Sending audio blob —", (blob.size / 1024).toFixed(1), "KB");
    blob.arrayBuffer().then((buf) => this.ws?.send(buf));
  }

  private _handleMessage(raw: string): void {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(raw) as ServerMessage;
    } catch {
      console.warn("[Socket] Non-JSON message:", raw);
      return;
    }

    console.log("[Socket] ←", msg.type, msg);

    switch (msg.type) {
      case "processing":
        this.callbacks.onProcessing?.();
        break;
      case "no_speech":
        console.warn("[Socket] No speech detected in recording");
        this.callbacks.onNoSpeech?.();
        break;
      case "transcript":
        this.callbacks.onTranscript?.({
          turnId: msg.turn_id,
          speaker: msg.speaker,
          text: msg.text,
          isPartial: msg.is_partial,
        });
        break;
      case "turn_complete":
        this.callbacks.onTurnComplete?.(msg.speaker, msg.turn_id);
        break;
      case "argument_update":
        this.callbacks.onArgumentUpdate?.({
          turnId: msg.turn_id,
          speaker: msg.speaker,
          role: msg.role,
          delta: msg.delta,
          isFinal: msg.is_final,
        });
        break;
      case "argument_complete":
        this.callbacks.onArgumentComplete?.(msg.speaker, msg.turn_id);
        break;
      case "error":
        console.error("[Socket] Server error:", msg.message);
        this.callbacks.onError?.(msg.message);
        break;
      case "session_ended":
        this._releaseMic();
        this.callbacks.onSessionEnded?.();
        break;
    }
  }
}
