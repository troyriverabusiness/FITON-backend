import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavDrawer from '../components/NavDrawer';
import './Chat.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  return (
    <div className="chat-root">
      <header className="page-header">
        <NavDrawer />
        <div className="page-header-center">
          <div className="page-header-title">COACH</div>
          <div className="page-header-subtitle">your debate coach</div>
        </div>
        <div className="page-header-right" />
      </header>

      <div className="page-header-divider" />

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-title">ask your debate coach</div>
            <div className="chat-empty-hints">
              <span>what's the strongest counterargument to X?</span>
              <span>how do I refute the slippery slope fallacy?</span>
              <span>help me steelman the opposing view</span>
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              className={`chat-msg ${m.role === 'user' ? 'chat-msg--user' : 'chat-msg--coach'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="chat-msg-role">
                {m.role === 'user' ? 'you' : 'coach'}
              </div>
              <div className="chat-msg-text">{m.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            className="chat-msg chat-msg--coach"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="chat-msg-role">coach</div>
            <div className="chat-typing">
              <span className="chat-dot chat-dot--1">.</span>
              <span className="chat-dot chat-dot--2">.</span>
              <span className="chat-dot chat-dot--3">.</span>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <div className="chat-input-divider" />
        <div className="chat-input-row">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="ask something… (Enter to send, Shift+Enter for newline)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={send}
            disabled={!input.trim() || loading}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
