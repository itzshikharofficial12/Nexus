'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Idea {
  id: number
  project_id: string
  content: string
  created_at: string
}

export function IdeasPanel() {
  console.log('IDEAS PANEL RENDERED')

  const [idea, setIdea] = useState('')
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [savedIdea, setSavedIdea] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    console.log('FETCHING ALL IDEAS')

    if (!supabase) {
      setError('Database not configured')
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      // Fetch all ideas
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('IDEAS DATA:', data)
      console.log('IDEAS ERROR:', error)

      if (error) {
        console.error('IDEAS FETCH ERROR:', error.message || error)
        return
      }

      if (!data) {
        setIdeas([])
        return
      }

      setIdeas(data)
      setError(null)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('ERR: Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveIdea = async () => {
    if (!idea.trim()) return
    if (!supabase) {
      setError('Database not configured')
      return
    }
    try {
      console.log('Saving global idea')
      const { data, error: supabaseError } = await supabase
        .from('ideas')
        .insert([{ content: idea.trim() }])
        .select()
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

  const handleDeleteIdea = async (ideaId: number) => {
    if (!supabase) {
      setError('Database not configured')
      return
    }
    try {
      console.log('Deleting idea:', ideaId)
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId)

      if (error) {
        console.error('DELETE ERROR:', error.message || error)
        return
      }

      console.log('Idea deleted successfully')
      setIdeas((prev) => prev.filter((item) => item.id !== ideaId))
    } catch (err) {
      console.error('Delete catch error:', err)
    }
  }

  const handleEditIdea = (ideaId: number, currentContent: string) => {
    setEditingId(ideaId)
    setEditValue(currentContent)
  }

  const handleSaveEdit = async (ideaId: number) => {
    if (!editValue.trim()) {
      setEditingId(null)
      return
    }

    if (!supabase) {
      setError('Database not configured')
      return
    }

    try {
      const { error } = await supabase
        .from('ideas')
        .update({ content: editValue })
        .eq('id', ideaId)

      if (error) {
        console.error('IDEA UPDATE ERROR:', error.message || error)
        return
      }

      console.log('Idea updated successfully')
      setIdeas((prev) =>
        prev.map((item) => (item.id === ideaId ? { ...item, content: editValue } : item))
      )
      setEditingId(null)
    } catch (err) {
      console.error('Edit save error:', err)
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
          {ideas.length > 0 ? (
            <div style={{ marginTop: 4 }}>
              <div className="mc-mono mc-label" style={{ marginBottom: 8 }}>RECENT LOG</div>
              <div
                className="mc-scroll"
                style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                {ideas.map((item, i) => (
                  <div
                    key={item.id}
                    className="group flex justify-between items-start gap-2 hover:bg-zinc-900/40 transition-all duration-150 cursor-text"
                    style={{
                      padding: '6px 9px',
                      background: 'rgba(9,9,11,0.8)',
                      border: '1px solid rgba(39,39,42,0.6)',
                      borderRadius: 5,
                      lineHeight: 1.5,
                    }}
                  >
                    <div className="mc-mono text-xs text-zinc-400/80 flex gap-2" style={{ flex: 1 }}>
                      <span className="text-zinc-600">{String(i + 1).padStart(2, '0')}</span>
                      {editingId === item.id ? (
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSaveEdit(item.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-transparent outline-none text-zinc-200 border-b border-zinc-700 focus:border-blue-500 transition-colors flex-1"
                          style={{ fontSize: '0.75rem' }}
                        />
                      ) : (
                        <span
                          onClick={() => handleEditIdea(item.id, item.content)}
                          className="hover:bg-zinc-800/50 px-1 py-0.5 rounded transition-colors"
                        >
                          {item.content}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteIdea(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-500 hover:text-red-400 cursor-pointer flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 text-sm">No ideas yet</p>
          )}
        </div>
      </div>
    </>
  )
}
