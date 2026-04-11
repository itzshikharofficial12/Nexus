"use client";

import { useEffect, useRef } from "react";

interface ProjectModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const modalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');

  @keyframes modal-in {
    from { opacity: 0; transform: scale(0.97) translateY(6px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes corner-draw {
    from { opacity: 0; width: 0; height: 0; }
    to   { opacity: 1; width: 10px; height: 10px; }
  }
  @keyframes scanline-modal {
    0%   { transform: translateY(-100%); opacity: 0.04; }
    50%  { opacity: 0.07; }
    100% { transform: translateY(1000%); opacity: 0.04; }
  }
  @keyframes pulse-status {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .modal-overlay {
    animation: overlay-in 0.2s ease forwards;
  }
  .modal-panel {
    animation: modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .modal-scanline {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(59,130,246,0.06) 50%, transparent 100%);
    height: 30%;
    animation: scanline-modal 5s linear infinite;
    pointer-events: none;
  }
  .modal-corner {
    position: absolute;
    animation: corner-draw 0.4s ease 0.1s both;
  }
  .modal-corner-tl { top: -1px; left: -1px; border-top: 1.5px solid #3b82f6; border-left: 1.5px solid #3b82f6; border-radius: 3px 0 0 0; }
  .modal-corner-tr { top: -1px; right: -1px; border-top: 1.5px solid #3b82f6; border-right: 1.5px solid #3b82f6; border-radius: 0 3px 0 0; }
  .modal-corner-bl { bottom: -1px; left: -1px; border-bottom: 1.5px solid #3b82f6; border-left: 1.5px solid #3b82f6; border-radius: 0 0 0 3px; }
  .modal-corner-br { bottom: -1px; right: -1px; border-bottom: 1.5px solid #3b82f6; border-right: 1.5px solid #3b82f6; border-radius: 0 0 3px 0; }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    background: rgba(39,39,42,0.8);
    border: 1px solid rgba(63,63,70,0.8);
    border-radius: 6px;
    color: #71717a;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: 'JetBrains Mono', monospace;
  }
  .close-btn:hover {
    background: rgba(239,68,68,0.1);
    border-color: rgba(239,68,68,0.4);
    color: #f87171;
  }

  .modal-status-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse-status 2.5s ease-in-out infinite;
  }

  .modal-scrollarea::-webkit-scrollbar { width: 4px; }
  .modal-scrollarea::-webkit-scrollbar-track { background: transparent; }
  .modal-scrollarea::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
  .modal-scrollarea::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
`

export function ProjectModal({ onClose, children }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const now = new Date();
  const sessionId = `SID-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return (
    <>
      <style>{modalStyles}</style>
      <div
        ref={overlayRef}
        className="modal-overlay"
        onClick={handleOverlayClick}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <div
          className="modal-panel"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 660,
            maxHeight: '90vh',
            background: 'rgba(9,9,11,0.97)',
            border: '1px solid rgba(39,39,42,0.9)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(59,130,246,0.06), 0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(59,130,246,0.04)',
          }}
        >
          {/* Corner accents */}
          <div className="modal-corner modal-corner-tl" style={{ width: 10, height: 10 }} />
          <div className="modal-corner modal-corner-tr" style={{ width: 10, height: 10 }} />
          <div className="modal-corner modal-corner-bl" style={{ width: 10, height: 10 }} />
          <div className="modal-corner modal-corner-br" style={{ width: 10, height: 10 }} />

          {/* Scanline */}
          <div className="modal-scanline" />

          {/* Header bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(39,39,42,0.8)',
            background: 'rgba(9,9,11,0.95)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}>
            {/* Left: system info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div className="modal-status-dot" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#52525b', letterSpacing: '0.1em' }}>
                  LIVE
                </span>
              </div>
              <div style={{ width: 1, height: 12, background: '#27272a' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#3f3f46', letterSpacing: '0.06em' }}>
                MISSION_CTRL
              </span>
              <div style={{ width: 1, height: 12, background: '#27272a' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#27272a' }}>
                {sessionId}
              </span>
            </div>

            {/* Right: window controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#3f3f46' }}>
                ESC to close
              </span>
              <button className="close-btn" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div
            className="modal-scrollarea"
            style={{
              overflowY: 'auto',
              maxHeight: 'calc(90vh - 53px)',
              padding: '24px',
            }}
          >
            {children}
          </div>

          {/* Footer */}
          <div style={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderTop: '1px solid rgba(39,39,42,0.6)',
            background: 'rgba(9,9,11,0.97)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {[
                { color: '#22c55e', label: 'SYS OK' },
                { color: '#3b82f6', label: 'AUTH VALID', delay: '0.6s' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%', background: s.color,
                    animation: `pulse-status 2.5s ease-in-out ${s.delay ?? '0s'} infinite`,
                  }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#3f3f46' }}>{s.label}</span>
                </div>
              ))}
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#27272a' }}>
              {now.toISOString().slice(0, 19)}Z
            </span>
          </div>
        </div>
      </div>
    </>
  );
}