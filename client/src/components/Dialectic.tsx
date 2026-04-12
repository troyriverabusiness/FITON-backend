import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useConversationSocket,
  type ArgumentUpdate,
  type ArgumentRole,
  type TranscriptEntry,
  type MediationAlert,
  type EmotionTag,
  type ArgumentConfidence,
} from '../hooks/useConversationSocket';
import NavDrawer from './NavDrawer';
import './Dialectic.css';

// ─── Types ──────────────────────────────────────────────────────────────────

type AppState = 'idle' | 'recording';

interface AccumulatedRole {
  text: string;
  isFinal: boolean;
  role: ArgumentRole;
}

// ─── Accumulator (mirrors client/components/ArgumentPanel _accumulateUpdates)

function accumulateUpdates(updates: ArgumentUpdate[]): {
  argument: AccumulatedRole & { turnId: string };
  counter: AccumulatedRole & { turnId: string };
} {
  let argText = "";
  let counterText = "";
  let argFinal = true;
  let counterFinal = true;
  let argTurnId = "";
  let counterTurnId = "";

  for (const u of updates) {
    if (u.role === "argument") {
      if (u.turnId !== argTurnId) {
        argText = "";
        argFinal = false;
        argTurnId = u.turnId;
      }
      argText += u.delta;
      if (u.isFinal) argFinal = true;
    } else {
      if (u.turnId !== counterTurnId) {
        counterText = "";
        counterFinal = false;
        counterTurnId = u.turnId;
      }
      counterText += u.delta;
      if (u.isFinal) counterFinal = true;
    }
  }

  return {
    argument: { text: argText, isFinal: argFinal, role: "argument", turnId: argTurnId },
    counter: { text: counterText, isFinal: counterFinal, role: "counterargument", turnId: counterTurnId },
  };
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="page-header d-header">
      <NavDrawer />
      <div className="page-header-center">
        <div className="page-header-title">FITON</div>
        <div className="page-header-subtitle">a real-time argument recorder</div>
      </div>
      <div className="page-header-right" />
    </header>
  );
}

// ─── Dividing Path ──────────────────────────────────────────────────────────

function DividingPath({ isRecording, audioLevel }: { isRecording: boolean; audioLevel: number }) {
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const currentScaleRef = useRef(0);

  useEffect(() => {
    let raf: number;
    let frame = 0;

    const animate = () => {
      frame++;
      const turbulence = turbulenceRef.current;
      const displacement = displacementRef.current;
      if (!turbulence || !displacement) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const seed = (frame * 0.008) % 100;
      turbulence.setAttribute('seed', seed.toString());

      let targetScale = 0;
      if (isRecording) {
        targetScale = audioLevel > 10 ? 5 : 1;
      }
      currentScaleRef.current += (targetScale - currentScaleRef.current) * 0.08;
      displacement.setAttribute('scale', currentScaleRef.current.toString());

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isRecording, audioLevel]);

  return (
    <svg
      className="d-dividing-path"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="turbulence-filter">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.015 0.008"
            numOctaves={2}
            seed={2}
            result="noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
        </filter>
      </defs>
      <path
        d="
          M 40 0
          C 62 80,  18 160, 40 240
          C 62 320, 18 400, 40 480
          C 62 560, 18 640, 40 720
          C 62 800, 18 880, 40 960
          C 62 1040,18 1120,40 1200
          C 62 1280,18 1360,40 1440
          C 62 1520,18 1600,40 9999
        "
        stroke="#000000"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        filter="url(#turbulence-filter)"
      />
    </svg>
  );
}

// ─── Logo Mark ──────────────────────────────────────────────────────────────

function LogoMark({ appState }: { appState: AppState }) {
  const isRecording = appState === 'recording';
  const animClass = isRecording ? 'd-logo--recording' : 'd-logo--idle';

  return (
    <div className={`d-logo ${animClass}`}>
      <svg
        width="72"
        height="72"
        viewBox="-36 -36 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="34" fill="#FFFFFF" />
        <ellipse cx="-1" cy="1" rx="28" ry="26" stroke="#000000" strokeWidth="0.7" fill="none" />
        <ellipse cx="2" cy="-1.5" rx="22" ry="23.5" stroke="#000000" strokeWidth="0.4" fill="none" />
        <path
          d="M -6 -22 C -20 -14, -23 4, -16 16 C -12 22, -4 24, 2 20"
          stroke="#000000"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 8 -18 C 18 -10, 22 2, 18 14 C 15 20, 8 22, 3 18"
          stroke="#000000"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="-1" cy="1" r="2.2" fill="#000000" />
        <circle cx="5" cy="-4" r="1" fill="#000000" />
        <circle cx="-5" cy="6" r="0.7" fill="#000000" />
        <line x1="-18" y1="-20" x2="20" y2="22" stroke="#000000" strokeWidth="0.3" opacity="0.35" />
        <line x1="-26" y1="-8" x2="-22" y2="-7" stroke="#000000" strokeWidth="0.6" />
        <line x1="14" y1="-24" x2="15" y2="-20" stroke="#000000" strokeWidth="0.6" />
        <circle cx="12" cy="16" r="3" stroke="#000000" strokeWidth="0.4" fill="none" />
      </svg>
    </div>
  );
}

// ─── Confidence Bar ──────────────────────────────────────────────────────────

function ConfidenceBar({ score, label }: { score: number; label: string }) {
  const pct = Math.max(0, Math.min(100, score));
  const colorClass =
    pct >= 75 ? 'd-conf--high' : pct >= 45 ? 'd-conf--mid' : 'd-conf--low';

  return (
    <div className="d-conf-row">
      <span className="d-conf-label">{label}</span>
      <div className="d-conf-track">
        <motion.div
          className={`d-conf-fill ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="d-conf-value">{pct}%</span>
    </div>
  );
}

// ─── Emotion Pills ───────────────────────────────────────────────────────────

function EmotionPills({ tags, side }: { tags: EmotionTag[]; side: 'left' | 'right' }) {
  return (
    <div className={`d-emotion-pills d-emotion-pills--${side}`}>
      <AnimatePresence>
        {tags.map((item, i) => (
          <motion.span
            key={item.tag}
            className="d-emotion-pill"
            title={item.confidence != null ? `confidence: ${item.confidence}%` : undefined}
            initial={{ opacity: 0, scale: 0.75, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.tag}
            {item.confidence != null && (
              <span className="d-emotion-pill-conf">{item.confidence}%</span>
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Streaming Card ─────────────────────────────────────────────────────────

function StreamingCard({ text, side, label }: { text: string; side: 'left' | 'right'; label: string }) {
  return (
    <motion.div
      className={`d-arg-card d-arg-card--${side}`}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="d-arg-meta">{label}</div>
      <div className="d-arg-headline">
        {text}<span className="d-streaming-cursor">▋</span>
      </div>
    </motion.div>
  );
}

// ─── Completed Role Card ────────────────────────────────────────────────────

function RoleCard({
  text,
  role,
  side,
  emotions,
  confidence,
}: {
  text: string;
  role: ArgumentRole;
  side: 'left' | 'right';
  emotions?: EmotionTag[];
  confidence?: number | null;
}) {
  const roleLabel = role === 'counterargument' ? 'counter' : 'argument';

  return (
    <motion.div
      className={`d-arg-card d-arg-card--${side}`}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="d-arg-meta">{roleLabel}</div>
      <div className="d-arg-headline">{text}</div>
      {confidence != null && (
        <ConfidenceBar score={confidence} label="ai confidence" />
      )}
      {emotions && emotions.length > 0 && <EmotionPills tags={emotions} side={side} />}
    </motion.div>
  );
}

function ArgumentSeparator() {
  return <div className="d-arg-separator">·</div>;
}

function EmptyPanel({ side }: { side: 'left' | 'right' }) {
  const label = side === 'left' ? 'SPEAKER A' : 'SPEAKER B';
  return (
    <div className={`d-empty-panel d-empty-panel--${side}`}>
      <div className="d-empty-label">{label}</div>
      <div className="d-empty-hint">arguments will appear here</div>
    </div>
  );
}

// ─── Speaker Panel ──────────────────────────────────────────────────────────

function SpeakerPanel({
  side,
  updates,
  emotions,
  argConfidence,
}: {
  side: 'left' | 'right';
  updates: ArgumentUpdate[];
  emotions: Record<string, EmotionTag[]>;
  argConfidence: Record<string, ArgumentConfidence>;
}) {
  const { argument, counter } = useMemo(() => accumulateUpdates(updates), [updates]);

  const hasContent = argument.text || counter.text;

  if (!hasContent) {
    return <EmptyPanel side={side} />;
  }

  const items: React.ReactNode[] = [];
  let idx = 0;

  if (argument.text) {
    const conf = argument.turnId ? argConfidence[argument.turnId] : undefined;
    if (argument.isFinal) {
      items.push(
        <RoleCard
          key="arg"
          text={argument.text}
          role="argument"
          side={side}
          emotions={emotions[argument.turnId]}
          confidence={conf?.argument}
        />
      );
    } else {
      items.push(<StreamingCard key="arg-stream" text={argument.text} side={side} label="argument" />);
    }
    idx++;
  }

  if (counter.text) {
    if (idx > 0) items.push(<ArgumentSeparator key="sep" />);
    const conf = counter.turnId ? argConfidence[counter.turnId] : undefined;
    if (counter.isFinal) {
      items.push(
        <RoleCard
          key="counter"
          text={counter.text}
          role="counterargument"
          side={side}
          confidence={conf?.counterargument}
        />
      );
    } else {
      items.push(<StreamingCard key="counter-stream" text={counter.text} side={side} label="counter" />);
    }
  }

  return <>{items}</>;
}

// ─── Transcript Panel ───────────────────────────────────────────────────────

function TranscriptPanel({ entries }: { entries: TranscriptEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries, expanded]);

  return (
    <div className="d-transcript-section">
      <div className="d-transcript-toggle" onClick={() => setExpanded(!expanded)}>
        <span className="d-transcript-arrow">{expanded ? '−' : '+'}</span>
        <span className="d-transcript-label">
          {entries.length > 0 ? `transcript · ${entries.length} turns` : 'transcript'}
        </span>
      </div>
      {expanded && (
        <div className="d-transcript-body">
          {entries.length === 0 ? (
            <div className="d-transcript-empty">
              transcript will appear here once speech is detected
            </div>
          ) : (
            entries.map((entry) => {
              const isSpeakerA = entry.speaker === "speaker_a";
              const label = isSpeakerA ? "Speaker A" : "Speaker B";
              return (
                <div
                  key={entry.turnId}
                  className={`d-transcript-turn ${isSpeakerA ? 'd-transcript-turn--a' : 'd-transcript-turn--b'}`}
                >
                  <div className="d-transcript-speaker">{label}</div>
                  <div className="d-transcript-text">{entry.text}</div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

// ─── Canvas ─────────────────────────────────────────────────────────────────

function Canvas({
  appState,
  audioLevel,
  speakerAUpdates,
  speakerBUpdates,
  speakerAEmotions,
  speakerBEmotions,
  speakerAArgConfidence,
  speakerBArgConfidence,
  isConnected,
}: {
  appState: AppState;
  audioLevel: number;
  speakerAUpdates: ArgumentUpdate[];
  speakerBUpdates: ArgumentUpdate[];
  speakerAEmotions: Record<string, EmotionTag[]>;
  speakerBEmotions: Record<string, EmotionTag[]>;
  speakerAArgConfidence: Record<string, ArgumentConfidence>;
  speakerBArgConfidence: Record<string, ArgumentConfidence>;
  isConnected: boolean;
}) {
  const isRecording = appState === 'recording';

  return (
    <div className="d-canvas">
      <DividingPath isRecording={isRecording} audioLevel={audioLevel} />
      <LogoMark appState={appState} />

      <div className="d-panel d-panel--left">
        <div className="d-panel-header">
          <div className="d-panel-label">SPEAKER A</div>
          <div className="d-panel-line" />
        </div>
        <div className="d-panel-content">
          <SpeakerPanel side="left" updates={speakerAUpdates} emotions={speakerAEmotions} argConfidence={speakerAArgConfidence} />
        </div>
      </div>

      <div className="d-panel d-panel--right">
        <div className="d-panel-header d-panel-header--right">
          <div className="d-panel-label">SPEAKER B</div>
          <div className="d-panel-line" />
        </div>
        <div className="d-panel-content">
          <SpeakerPanel side="right" updates={speakerBUpdates} emotions={speakerBEmotions} argConfidence={speakerBArgConfidence} />
        </div>
      </div>

      <div className="d-connection-status">
        {isConnected ? 'connected' : 'disconnected'}
      </div>
    </div>
  );
}

// ─── Mediation Overlay ──────────────────────────────────────────────────────

const TRIGGER_LABELS: Record<MediationAlert['trigger'], string> = {
  off_topic: 'off topic',
  escalating: 'escalating',
  emotional: 'getting emotional',
};

function MediationOverlay({
  alert,
  onDismiss,
}: {
  alert: MediationAlert;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {alert && (
        <>
          {alert.severity === 'high' && (
            <motion.div
              className="d-mediation-flash"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          )}
          <motion.div
            className={`d-mediation-banner d-mediation-banner--${alert.severity}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="d-mediation-inner">
              <span className="d-mediation-tag">{TRIGGER_LABELS[alert.trigger]}</span>
              <p className="d-mediation-message">{alert.message}</p>
            </div>
            <button className="d-mediation-dismiss" onClick={onDismiss} aria-label="Dismiss">
              ×
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function Dialectic() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const {
    startSession,
    endSession,
    micError,
    isConnected,
    speakerAUpdates,
    speakerBUpdates,
    speakerAEmotions,
    speakerBEmotions,
    speakerAArgConfidence,
    speakerBArgConfidence,
    transcripts,
    mediationAlert,
    dismissMediationAlert,
  } = useConversationSocket();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const monitorRef = useRef<number>(0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const monitorAudio = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    setAudioLevel(avg);
    monitorRef.current = requestAnimationFrame(monitorAudio);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await startSession();

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      startTimeRef.current = Date.now();
      setElapsed(0);
      setAppState('recording');

      timerRef.current = window.setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);

      monitorRef.current = requestAnimationFrame(monitorAudio);
    } catch {
      // micError is set inside the hook
    }
  }, [startSession, monitorAudio]);

  const stopRecording = useCallback(() => {
    endSession();

    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    clearInterval(timerRef.current);
    cancelAnimationFrame(monitorRef.current);
    setAppState('idle');
  }, [endSession]);

  useEffect(() => {
    return () => {
      endSession();
      if (audioCtxRef.current) audioCtxRef.current.close();
      clearInterval(timerRef.current);
      cancelAnimationFrame(monitorRef.current);
    };
  }, [endSession]);

  return (
    <div className="d-root">
      <Header />
      {mediationAlert && (
        <MediationOverlay alert={mediationAlert} onDismiss={dismissMediationAlert} />
      )}

      <div className="d-canvas-wrapper">
        <Canvas
          appState={appState}
          audioLevel={audioLevel}
          speakerAUpdates={speakerAUpdates}
          speakerBUpdates={speakerBUpdates}
          speakerAEmotions={speakerAEmotions}
          speakerBEmotions={speakerBEmotions}
          speakerAArgConfidence={speakerAArgConfidence}
          speakerBArgConfidence={speakerBArgConfidence}
          isConnected={isConnected}
        />
      </div>

      <TranscriptPanel entries={transcripts} />

      <div className="d-footer">
        <div className="d-footer-line" />
        <div className="d-footer-content">
          {appState === 'recording' && (
            <div className="d-timer">{formatTime(elapsed)}</div>
          )}

          <div className="d-record-area">
            <button
              className={`d-record-btn ${appState === 'recording' ? 'd-record-btn--active' : ''} ${micError ? 'd-record-btn--disabled' : ''}`}
              onClick={appState === 'idle' ? startRecording : stopRecording}
              disabled={!!micError && appState === 'idle'}
            >
              <span
                className={`d-record-inner ${appState === 'recording' ? 'd-record-inner--square' : ''}`}
              />
            </button>
            <div className="d-record-label">
              {appState === 'recording' ? (
                <span>recording<span className="d-blink">_</span></span>
              ) : (
                'begin'
              )}
            </div>
            {appState === 'recording' && (
              <div className="d-end-debate" onClick={stopRecording}>
                end debate
              </div>
            )}
            {micError && (
              <div className="d-mic-error">{micError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
