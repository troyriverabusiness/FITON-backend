import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import './PreSessionBriefing.css';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

interface Pattern {
  argument: string;
  rebuttal: string;
}

interface BriefingResponse {
  topic: string;
  patterns: Pattern[];
  past_data_count: number;
}

interface PreSessionBriefingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PreSessionBriefing({ open, onOpenChange }: PreSessionBriefingProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BriefingResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/briefing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data: BriefingResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate briefing');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTopic('');
      setResult(null);
      setError('');
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="briefing-dialog">
        <DialogHeader>
          <DialogTitle className="briefing-title">Prepare for debate</DialogTitle>
          <DialogDescription className="briefing-description">
            Enter your debate topic to surface common arguments used against you and ready-made rebuttals.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <form onSubmit={handleSubmit} className="briefing-form">
            <input
              type="text"
              className="briefing-input"
              placeholder="e.g. immigration, gun control, universal healthcare..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="briefing-submit"
              disabled={!topic.trim() || loading}
            >
              {loading ? 'analysing...' : 'get briefing'}
            </button>
            {error && <div className="briefing-error">{error}</div>}

            {loading && (
              <div className="briefing-loading">
                <div className="briefing-loading-dots">
                  <span className="d-dot d-dot--1">.</span>
                  <span className="d-dot d-dot--2">.</span>
                  <span className="d-dot d-dot--3">.</span>
                </div>
                <div className="briefing-loading-text">mining past debates</div>
              </div>
            )}
          </form>
        ) : (
          <div className="briefing-results">
            <div className="briefing-topic-label">
              topic: <span className="briefing-topic-value">{result.topic}</span>
            </div>
            {result.past_data_count > 0 && (
              <div className="briefing-data-note">
                based on {result.past_data_count} past counterargument{result.past_data_count !== 1 ? 's' : ''}
              </div>
            )}

            <div className="briefing-patterns">
              {result.patterns.map((pattern, i) => (
                <div key={i} className="briefing-card">
                  <div className="briefing-card-header">
                    <span className="briefing-card-label">argument {i + 1}</span>
                  </div>
                  <div className="briefing-card-argument">{pattern.argument}</div>
                  <div className="briefing-card-rebuttal-label">rebuttal</div>
                  <div className="briefing-card-rebuttal">{pattern.rebuttal}</div>
                </div>
              ))}
            </div>

            <button
              className="briefing-reset"
              onClick={() => { setResult(null); setTopic(''); }}
            >
              try another topic
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
