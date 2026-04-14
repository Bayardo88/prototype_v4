import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MaterialIcon } from './MaterialIcon.jsx';

/**
 * Full-screen search overlay (⌘K / Ctrl+K) opened from the primary header search control.
 */
export function SearchModal({ open, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="search-modal-root">
      <button type="button" className="search-modal-backdrop" aria-label="Close search" onClick={onClose} />
      <div
        id="search-modal-dialog"
        className="search-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <h2 id="search-modal-title" className="search-modal-title">
          Search
        </h2>
        <div className="search-modal-field" role="search">
          <MaterialIcon name="search" size={22} color="var(--neutral-500)" />
          <input
            ref={inputRef}
            type="search"
            className="search-modal-input"
            placeholder="Search companies, funds, documents…"
            aria-label="Search"
            data-search-modal-input
            autoComplete="off"
          />
        </div>
        <p className="search-modal-hint">Press Esc to close · ⌘K or Ctrl+K to toggle</p>
      </div>
    </div>,
    document.body
  );
}
