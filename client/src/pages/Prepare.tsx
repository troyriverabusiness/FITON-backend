import { useState, type FormEvent } from 'react';
import NavDrawer from '../components/NavDrawer';
import './Prepare.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

interface Pattern {
  argument: string;
  emotional_drivers: string;
  emotion_tags: string[];
  rebuttal: string;
  confidence: number | null;
}

interface BriefingResult {
  topic: string;
  patterns: Pattern[];
  past_data_count: number;
}

export default function Prepare() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BriefingResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
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
      setResult(await res.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate briefing');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setTopic(''); setError(''); };

  return (
    <div className="pr-root">
      <header className="page-header">
        <NavDrawer />
        <div className="page-header-center">
          <div className="page-header-title">PERSPECTIVES</div>
          <div className="page-header-subtitle">understand the other side before you speak</div>
        </div>
        <div className="page-header-right" />
      </header>

      <div className="page-header-divider" />

      <div className="pr-content">
        {!result ? (
          <form onSubmit={handleSubmit} className="pr-form">
            <label className="pr-label">what's the topic</label>
            <input
              type="text"
              className="pr-input"
              placeholder="e.g. immigration, gun control, universal healthcare…"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              autoFocus
              autoComplete="off"
            />
            <button
              type="submit"
              className="pr-submit"
              disabled={!topic.trim() || loading}
            >
              {loading ? 'exploring…' : 'explore perspectives'}
            </button>
            {error && <div className="pr-error">{error}</div>}
            {loading && (
              <div className="pr-loading">
                <span className="pr-dot pr-dot--1">.</span>
                <span className="pr-dot pr-dot--2">.</span>
                <span className="pr-dot pr-dot--3">.</span>
                <span className="pr-loading-text">exploring perspectives</span>
              </div>
            )}
          </form>
        ) : (
          <div className="pr-results">
            <div className="pr-results-meta">
              <span className="pr-results-topic">
                topic: <em>{result.topic}</em>
              </span>
              {result.past_data_count > 0 && (
                <span className="pr-results-note">
                  based on {result.past_data_count} past counterargument{result.past_data_count !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="pr-cards">
              {result.patterns.map((p, i) => (
                <div key={i} className="pr-card">
                  <div className="pr-card-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="pr-card-body">
                    <div className="pr-card-section-label">the argument</div>
                    <div className="pr-card-arg">{p.argument}</div>
                    {p.confidence != null && (
                      <div className="pr-conf-row">
                        <span className="pr-conf-label">ai confidence</span>
                        <div className="pr-conf-track">
                          <div
                            className="pr-conf-fill"
                            style={{
                              width: `${p.confidence}%`,
                              opacity: p.confidence >= 75 ? 0.7 : p.confidence >= 45 ? 0.5 : 0.35,
                            }}
                          />
                        </div>
                        <span className="pr-conf-value">{p.confidence}%</span>
                      </div>
                    )}
                    <div className="pr-card-divider" />
                    <div className="pr-card-section-label">why people feel this way</div>
                    <div className="pr-card-drivers">{p.emotional_drivers}</div>
                    {p.emotion_tags && p.emotion_tags.length > 0 && (
                      <div className="pr-emotion-pills">
                        {p.emotion_tags.map((tag, j) => (
                          <span key={j} className="pr-emotion-pill">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="pr-card-divider" />
                    <div className="pr-card-section-label">how to engage</div>
                    <div className="pr-card-rebuttal">{p.rebuttal}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="pr-reset" onClick={reset}>
              try another topic
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
