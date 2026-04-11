'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Idea {
  id: number
  content: string
  created_at: string
}

export function IdeasPanel() {
  const [idea, setIdea] = useState('')
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [savedIdea, setSavedIdea] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchIdeas() }, [])

  const fetchIdeas = async () => {
    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('ideas').select('*').order('created_at', { ascending: false })
      if (supabaseError) throw supabaseError
      setIdeas(data || [])
      setError(null)
    } catch {
      setError('ERR: Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveIdea = async () => {
    if (!idea.trim()) return
    try {
      const { data, error: supabaseError } = await supabase
        .from('ideas').insert([{ content: idea.trim() }]).select()
      if (supabaseError) throw supabaseError
      if (data?.length) setIdeas((prev) => [data[0], ...prev])
      setIdea('')
      setSavedIdea(true)
      setError(null)
      setTimeout(() => setSavedIdea(false), 2000)
    } catch {
      setError('ERR: Save failed')
      setTimeout(() => setError(null), 2000)
    }
  }

  return (
    <>
      <div className="mc-root mc-card" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        <div className="mc-card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3b82f6', fontSize: 12 }}>◐</span>
            <span className="mc-mono mc-label">IDEA_BUFFER</span>
          </div>
          <span className="mc-mono mc-label">{ideas.length} LOGGED</span>
        </div>

        <div className="mc-card-body" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="// Capture signal..."
            rows={3}
            className="mc-input mc-scroll"
            style={{ resize: 'none', lineHeight: 1.6 }}
          />

          <button
            onClick={handleSaveIdea}
            className={savedIdea || error ? 'mc-btn-secondary' : 'mc-btn-primary'}
            style={{ width: '100%', textAlign: 'center' }}
          >
            {error ? '⚠ ERROR' : savedIdea ? '✓ COMMITTED' : '+ COMMIT IDEA'}
          </button>

          {/* Ideas log */}
          {ideas.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <div className="mc-mono mc-label" style={{ marginBottom: 8 }}>RECENT LOG</div>
              <div
                className="mc-scroll"
                style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                {ideas.map((item, i) => (
                  <div
                    key={item.id}
                    className="mc-mono text-xs text-zinc-400/80"
                    style={{
                      padding: '6px 9px',
                      background: 'rgba(9,9,11,0.8)',
                      border: '1px solid rgba(39,39,42,0.6)',
                      borderRadius: 5, lineHeight: 1.5,
                    }}
                  >
                    <span className="text-zinc-600" style={{ marginRight: 6 }}>{String(i + 1).padStart(2, '0')}</span>
                    {item.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}