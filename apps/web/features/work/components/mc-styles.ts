export const MC_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .mc-root { font-family: 'Syne', sans-serif; }
  .mc-mono { font-family: 'JetBrains Mono', monospace !important; }

  .mc-card {
    background: rgba(9,9,11,0.85);
    border: 1px solid rgba(39,39,42,0.9);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }
  .mc-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59,130,246,0.02) 0%, transparent 60%);
    pointer-events: none;
  }

  .mc-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(39,39,42,0.8);
    background: rgba(9,9,11,0.9);
  }
  .mc-card-body { 
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .mc-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6b7280;
    line-height: 1.4;
  }
  .mc-label-blue { color: #3b82f6; }

  .mc-input {
    width: 100%;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 6px;
    padding: 12px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #f4f4f5;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
    line-height: 1.6;
  }
  .mc-input::placeholder { color: #a1a1aa; }
  .mc-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
    background: #18181b;
  }

  .mc-btn-primary {
    background: #1d4ed8;
    border: 1px solid rgba(59,130,246,0.4);
    border-radius: 6px;
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    padding: 8px 14px;
  }
  .mc-btn-primary:hover { background: #2563eb; border-color: rgba(96,165,250,0.5); }

  .mc-btn-secondary {
    background: rgba(24,24,27,0.9);
    border: 1px solid rgba(39,39,42,0.9);
    border-radius: 6px;
    color: #71717a;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    padding: 8px 14px;
  }
  .mc-btn-secondary:hover { background: rgba(39,39,42,0.9); color: #a1a1aa; }

  @keyframes mc-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  .mc-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    animation: mc-pulse 2.5s ease-in-out infinite;
    flex-shrink: 0;
  }

  .mc-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid;
  }
  .mc-badge-active  { background: rgba(59,130,246,0.08); color: #60a5fa; border-color: rgba(59,130,246,0.2); }
  .mc-badge-review  { background: rgba(245,158,11,0.08); color: #fbbf24; border-color: rgba(245,158,11,0.2); }
  .mc-badge-planned { background: rgba(39,39,42,0.5);    color: #52525b; border-color: rgba(63,63,70,0.4);   }
  .mc-badge-done    { background: rgba(34,197,94,0.08);  color: #4ade80; border-color: rgba(34,197,94,0.2);  }
  .mc-badge-upcoming{ background: rgba(59,130,246,0.08); color: #60a5fa; border-color: rgba(59,130,246,0.2); }

  .mc-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 7px;
    background: rgba(59,130,246,0.07);
    border: 1px solid rgba(59,130,246,0.15);
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #60a5fa;
  }

  .mc-corner { position: absolute; width: 8px; height: 8px; }
  .mc-corner-tl { top: 0; left: 0; border-top: 1px solid rgba(59,130,246,0.4); border-left: 1px solid rgba(59,130,246,0.4); border-radius: 2px 0 0 0; }
  .mc-corner-tr { top: 0; right: 0; border-top: 1px solid rgba(59,130,246,0.4); border-right: 1px solid rgba(59,130,246,0.4); border-radius: 0 2px 0 0; }
  .mc-corner-bl { bottom: 0; left: 0; border-bottom: 1px solid rgba(59,130,246,0.4); border-left: 1px solid rgba(59,130,246,0.4); border-radius: 0 0 0 2px; }
  .mc-corner-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(59,130,246,0.4); border-right: 1px solid rgba(59,130,246,0.4); border-radius: 0 0 2px 0; }

  .mc-scroll::-webkit-scrollbar { width: 3px; }
  .mc-scroll::-webkit-scrollbar-track { background: transparent; }
  .mc-scroll::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
  .mc-scroll::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

  .mc-divider { border: none; border-top: 1px solid rgba(39,39,42,0.7); margin: 0; }

  @keyframes mc-scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(600%); }
  }
  .mc-scanline {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(59,130,246,0.04) 50%, transparent 100%);
    height: 25%;
    animation: mc-scanline 6s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
`