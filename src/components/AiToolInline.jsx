/**
 * Scalar Design System: AI Tool (trigger -> input field)
 * Figma: Scalar_Design_System-Components
 * - Trigger: 466:3116
 * - Input:   466:3115
 *
 * Uses Figma-hosted asset URLs (expire ~7 days).
 * Replace with checked-in assets when ready.
 */
import { useEffect, useRef, useState } from 'react';

const AI_TRIGGER_UNION_IMG = 'https://www.figma.com/api/mcp/asset/0ca2019f-8bac-48c0-a6df-936176d13301';
const AI_INPUT_UNION_IMG = 'https://www.figma.com/api/mcp/asset/ff00ffa1-44c6-4116-b6e2-1176b0929d97';

export function AiToolInline({ className = '' }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        className={`ai-btn ${className}`.trim()}
        aria-label="AI"
        onClick={() => setOpen(true)}
      >
        <img className="ai-btn-icon" src={AI_TRIGGER_UNION_IMG} alt="" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className={`ai-input ${className}`.trim()} aria-label="AI prompt">
      <img className="ai-input-icon" src={AI_INPUT_UNION_IMG} alt="" aria-hidden="true" />
      <input ref={inputRef} className="ai-input-text" placeholder="How can I help you?" />
      <button type="button" className="ai-input-chip" aria-label="Hint">
        <span className="ai-input-chip-text">Hit Return</span>
      </button>
    </div>
  );
}

