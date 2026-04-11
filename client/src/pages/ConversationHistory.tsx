import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./ConversationHistory.css";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

interface ConversationSummary {
  id: string;
  created_at: string;
  ended_at: string | null;
  turn_count: number;
}

async function fetchConversations(): Promise<ConversationSummary[]> {
  const res = await fetch(`${API_BASE}/conversations`);
  if (!res.ok) throw new Error("Failed to fetch conversations");
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

function duration(start: string, end: string | null): string {
  if (!end) return "--";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ConversationHistory() {
  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  return (
    <div className="ch-root">
      <header className="ch-header">
        <Link to="/" className="ch-back">&larr; back</Link>
        <div className="ch-title">Past Conversations</div>
        <div className="ch-subtitle">review previous debates</div>
      </header>

      <div className="ch-content">
        {isLoading && <div className="ch-empty">Loading&hellip;</div>}
        {error && <div className="ch-empty">Could not load conversations.</div>}
        {conversations && conversations.length === 0 && (
          <div className="ch-empty">
            No conversations yet. Record a debate to see it here.
          </div>
        )}
        {conversations && conversations.length > 0 && (
          <div className="ch-list">
            {conversations.map((c) => (
              <Link key={c.id} to={`/conversations/${c.id}`} className="ch-card">
                <div className="ch-card-row">
                  <span className="ch-card-date">{formatDate(c.created_at)}</span>
                  <span className="ch-card-time">{formatTime(c.created_at)}</span>
                </div>
                <div className="ch-card-row">
                  <span className="ch-card-turns">{c.turn_count} turns</span>
                  <span className="ch-card-duration">
                    {duration(c.created_at, c.ended_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
