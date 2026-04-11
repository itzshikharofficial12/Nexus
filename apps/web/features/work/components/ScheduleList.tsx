'use client'

interface ScheduleItem {
  label: string
  time: string
  type: string
}

interface ScheduleListProps {
  schedule: ScheduleItem[]
}

const TYPE_MAP: Record<string, { cls: string; icon: string; dot: string }> = {
  upcoming: { cls: 'mc-badge-upcoming', icon: '→', dot: '#3b82f6' },
  done:     { cls: 'mc-badge-done',     icon: '✓', dot: '#22c55e' },
}

export function ScheduleList({ schedule }: ScheduleListProps) {
  const upcoming = schedule.filter((s) => s.type === 'upcoming').length

  return (
    <>
      <div className="mc-root mc-card col-span-2" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        {/* Header */}
        <div className="mc-card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3b82f6', fontSize: 12 }}>≡</span>
            <span className="mc-mono mc-label">MISSION_LOG</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div className="mc-dot" style={{ background: '#3b82f6' }} />
              <span className="mc-mono mc-label">{upcoming} UPCOMING</span>
            </div>
            <div style={{ width: 1, height: 10, background: '#27272a' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div className="mc-dot" style={{ background: '#22c55e' }} />
              <span className="mc-mono mc-label">{schedule.length - upcoming} COMPLETED</span>
            </div>
          </div>
        </div>

        <div className="mc-card-body" style={{ position: 'relative', zIndex: 1 }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {schedule.map((item, i) => {
              const t = TYPE_MAP[item.type] ?? TYPE_MAP.done
              return (
                <li
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 8px',
                    borderBottom: i < schedule.length - 1 ? '1px solid rgba(39,39,42,0.5)' : 'none',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mc-mono" style={{ fontSize: 10, color: t.dot, width: 12 }}>{t.icon}</span>
                    <span className="mc-mono" style={{ fontSize: 11, color: item.type === 'done' ? '#52525b' : '#a1a1aa' }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span className="mc-mono" style={{ fontSize: 10, color: '#3f3f46' }}>{item.time}</span>
                    <span className={`mc-badge ${t.cls}`}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.dot, flexShrink: 0 }} />
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}