'use client'

interface Stat {
  label: string
  value: string
}

interface QuickStatsProps {
  stats: Stat[]
}

const STAT_ICONS = ['◈', '⊞', '◎', '⬡']

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <>
      <div className="mc-root mc-card" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        <div className="mc-card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3b82f6', fontSize: 12 }}>⊞</span>
            <span className="mc-mono mc-label">SYSTEM_METRICS</span>
          </div>
          <div className="mc-dot" style={{ background: '#22c55e' }} />
        </div>

        <div className="mc-card-body" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(9,9,11,0.8)',
                  border: '1px solid rgba(39,39,42,0.8)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="mc-mono"
                  style={{ position: 'absolute', top: 6, right: 8, fontSize: 12, color: 'rgba(59,130,246,0.12)' }}
                >
                  {STAT_ICONS[i]}
                </span>
                <p
                  className="mc-mono"
                  style={{ fontSize: 22, fontWeight: 600, color: '#e4e4e7', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </p>
                <p className="mc-mono" style={{ fontSize: 9, color: '#52525b', marginTop: 5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}