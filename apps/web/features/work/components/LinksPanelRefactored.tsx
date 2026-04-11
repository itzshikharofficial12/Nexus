'use client'

interface Link {
  label: string
  href: string
}

interface LinksPanelProps {
  links: Link[]
}

const LINK_ICONS: Record<string, string> = {
  GitHub: '⊹',
  LinkedIn: '⊹',
  Figma: '⊹',
  Notion: '⊹',
  Vercel: '⊹',
}

export function LinksPanel({ links }: LinksPanelProps) {
  return (
    <>
      <div className="mc-root mc-card" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        <div className="mc-card-header">
          <span style={{ color: '#3b82f6', fontSize: 12 }}>⊞</span>
          <span className="mc-mono mc-label">RESOURCE_LINKS</span>
        </div>

        <div className="mc-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', zIndex: 1 }}>
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mc-mono text-xs text-zinc-400/80"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px',
                background: 'rgba(9,9,11,0.8)',
                border: '1px solid rgba(39,39,42,0.7)',
                borderRadius: 6,
                textDecoration: 'none',
                transition: 'border-color 0.15s, color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(59,130,246,0.3)'
                el.style.color = '#a1a1aa'
                el.style.background = 'rgba(59,130,246,0.04)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(39,39,42,0.7)'
                el.style.color = '#71717a'
                el.style.background = 'rgba(9,9,11,0.8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="text-zinc-700" style={{ fontSize: 9 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: '#3b82f6', fontSize: 10 }}>{LINK_ICONS[link.label] ?? '⊹'}</span>
                <span>{link.label}</span>
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H4M8 2v4" stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}