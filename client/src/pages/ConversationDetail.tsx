import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import NavDrawer from "../components/NavDrawer";
import "./ConversationDetail.css";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

interface TurnData {
  id: string;
  speaker: string;
  text: string;
  argument_text: string;
  counterargument_text: string;
  emotion_tags: string[] | null;
  position: number;
}

interface ConversationData {
  id: string;
  created_at: string;
  ended_at: string | null;
  turns: TurnData[];
  title: string | null;
}

async function fetchConversation(id: string): Promise<ConversationData> {
  const res = await fetch(`${API_BASE}/conversations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch conversation");
  return res.json();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EmotionPills({ tags }: { tags: string[] }) {
  return (
    <div className="cd-emotion-pills">
      {tags.map((tag) => (
        <span key={tag} className="cd-emotion-pill">{tag}</span>
      ))}
    </div>
  );
}

function ArgumentCard({
  label,
  text,
  side,
}: {
  label: string;
  text: string;
  side: "left" | "right";
}) {
  if (!text) return null;
  return (
    <div className={`cd-arg-card cd-arg-card--${side}`}>
      <div className="cd-arg-meta">{label}</div>
      <div className="cd-arg-text">{text}</div>
    </div>
  );
}

function TurnBubble({ turn }: { turn: TurnData }) {
  const [expanded, setExpanded] = useState(false);
  const isA = turn.speaker === "speaker_a";
  const side = isA ? "left" : "right";
  const label = isA ? "Speaker A" : "Speaker B";
  const hasArgs = !!turn.argument_text || !!turn.counterargument_text;

  return (
    <motion.div
      className={`cd-turn cd-turn--${side}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="cd-turn-speaker">{label}</div>
      <div className="cd-turn-text">{turn.text}</div>

      {turn.emotion_tags && turn.emotion_tags.length > 0 && (
        <EmotionPills tags={turn.emotion_tags} />
      )}

      {hasArgs && (
        <>
          <button
            className="cd-expand-btn"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? "hide analysis" : "show analysis"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                className="cd-args"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {turn.argument_text && (
                  <ArgumentCard label="argument" text={turn.argument_text} side={side} />
                )}
                {turn.counterargument_text && (
                  <ArgumentCard label="counter" text={turn.counterargument_text} side={side} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

export default function ConversationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: conversation, isLoading, error } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => fetchConversation(id!),
    enabled: !!id,
  });

  return (
    <div className="cd-root">
      <header className="page-header">
        <NavDrawer />
        <div className="page-header-center">
          <div className="page-header-title">
            {conversation?.title ?? "Conversation"}
          </div>
          {conversation && (
            <div className="page-header-subtitle">
              {formatDate(conversation.created_at)} &middot;{" "}
              {formatTime(conversation.created_at)} &middot;{" "}
              {conversation.turns.length} turns
            </div>
          )}
        </div>
        <div className="page-header-right">
          <Link to="/conversations" className="page-back-link">&larr; back</Link>
        </div>
      </header>

      <div className="cd-thread">
        {isLoading && <div className="cd-empty">Loading&hellip;</div>}
        {error && <div className="cd-empty">Could not load conversation.</div>}

        {conversation && conversation.turns.length === 0 && (
          <div className="cd-empty">This conversation has no turns.</div>
        )}

        {conversation &&
          conversation.turns.map((turn) => (
            <TurnBubble key={turn.id} turn={turn} />
          ))}
      </div>
    </div>
  );
}
