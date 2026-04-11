'use client'

import { useEffect, useRef, useState } from 'react'

const PRESETS = [
  { label: '25m', seconds: 25 * 60 },
  { label: '50m', seconds: 50 * 60 },
  { label: '10m', seconds: 10 * 60 },
]

export function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60)
  const [total, setTotal] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0))
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const progress = total > 0 ? (total - seconds) / total : 0
  const circumference = 2 * Math.PI * 36
  const strokeDash = circumference * progress

  return (
    <>
      <div className="mc-root mc-card" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        {/* Header */}
        <div className="mc-card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3b82f6', fontSize: 12 }}>◎</span>
            <span className="mc-mono mc-label">FOCUS_TIMER</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="mc-dot" style={{ background: running ? '#3b82f6' : '#27272a', animationPlayState: running ? 'running' : 'paused' }} />
            <span className="mc-mono mc-label">{running ? 'RUNNING' : 'IDLE'}</span>
          </div>
        </div>

        <div className="mc-card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative', zIndex: 1 }}>

          {/* Presets */}
          <div style={{ display: 'flex', gap: 6, width: '100%', marginBottom: 16 }}>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => { setRunning(false); setSeconds(p.seconds); setTotal(p.seconds) }}
                className="mc-mono"
                style={{
                  flex: 1, padding: '5px 0',
                  background: total === p.seconds ? 'rgba(59,130,246,0.1)' : 'rgba(24,24,27,0.8)',
                  border: `1px solid ${total === p.seconds ? 'rgba(59,130,246,0.3)' : 'rgba(39,39,42,0.8)'}`,
                  borderRadius: 5, fontSize: 10, color: total === p.seconds ? '#60a5fa' : '#52525b',
                  cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.15s',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Ring + timer */}
          <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 14 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(39,39,42,0.6)" strokeWidth="2" />
              <circle
                cx="50" cy="50" r="36" fill="none"
                stroke="#3b82f6" strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                style={{ transition: 'stroke-dasharray 1s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span
                className="mc-mono"
                style={{ fontSize: 20, fontWeight: 600, color: seconds === 0 ? '#f87171' : '#e4e4e7', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {formatTime(seconds)}
              </span>
              <span className="mc-mono" style={{ fontSize: 8, color: '#3f3f46', marginTop: 2, letterSpacing: '0.08em' }}>
                POMODORO
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <button
              onClick={() => setRunning((r) => !r)}
              className="mc-btn-primary"
              style={{ flex: 1 }}
            >
              {running ? '⏸ PAUSE' : '▶ START'}
            </button>
            <button
              onClick={() => { setRunning(false); setSeconds(total) }}
              className="mc-btn-secondary"
              style={{ flex: 1 }}
            >
              ↺ RESET
            </button>
          </div>
        </div>
      </div>
    </>
  )
}