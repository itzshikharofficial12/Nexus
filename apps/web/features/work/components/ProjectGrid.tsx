'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MC_STYLES } from './mc-styles'
import { ProjectForm } from './ProjectForm'
import { ProjectModal } from './ProjectModal'
import { createClient } from '@supabase/supabase-js'

interface Project {
  id: number
  title: string
  desc: string
  status: string
  tags: string[]
}

interface ProjectGridProps {
  projects: Project[]
  onProjectAdded?: () => void
}

const STATUS_MAP: Record<string, { dot: string; cls: string; label: string }> = {
  active:  { dot: '#3b82f6', cls: 'mc-badge-active',  label: 'ACTIVE'  },
  review:  { dot: '#f59e0b', cls: 'mc-badge-review',  label: 'REVIEW'  },
  planned: { dot: '#52525b', cls: 'mc-badge-planned', label: 'PLANNED' },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export function ProjectGrid({ projects, onProjectAdded }: ProjectGridProps) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<'title' | 'desc' | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const router = useRouter()

  const handleFieldClick = (e: React.MouseEvent, projectId: number, field: 'title' | 'desc', value: string) => {
    e.stopPropagation()
    setEditingId(projectId)
    setEditingField(field)
    setEditingValue(value)
  }

  const handleSave = async (projectId: number) => {
    if (!editingField || editingValue.trim() === '') {
      setEditingId(null)
      setEditingField(null)
      return
    }

    try {
      const updateData = editingField === 'title' 
        ? { title: editingValue }
        : { desc: editingValue }

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId)

      if (error) {
        console.error('Error updating project:', error)
      } else {
        console.log(`✓ Project ${editingField} updated`)
        // Call parent callback to refresh projects list
        if (onProjectAdded) onProjectAdded()
      }
    } catch (err) {
      console.error('Error saving project:', err)
    }

    setEditingId(null)
    setEditingField(null)
  }

  return (
    <>
      <style>{MC_STYLES}</style>
      <div className="mc-root mc-card col-span-2" style={{ padding: 0 }}>
        <div className="mc-corner mc-corner-tl" /><div className="mc-corner mc-corner-tr" />
        <div className="mc-corner mc-corner-bl" /><div className="mc-corner mc-corner-br" />

        {/* Header */}
        <div className="mc-card-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3b82f6', fontSize: 12 }}>⬡</span>
            <span className="mc-mono mc-label">ACTIVE_PROJECTS</span>
            <div style={{ width: 1, height: 10, background: '#27272a' }} />
            <span className="mc-mono mc-label">{projects.length} REGISTERED</span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mc-mono"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px',
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 5, fontSize: 10, color: '#60a5fa',
              cursor: 'pointer', letterSpacing: '0.08em', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.15)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.08)' }}
          >
            <span>+</span> NEW PROJECT
          </button>
        </div>

        {/* Grid */}
        <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, position: 'relative', zIndex: 1 }}>
          {projects.map((p, i) => {
            const s = STATUS_MAP[p.status] ?? STATUS_MAP.planned
            const isHovered = hoveredId === p.id
            const isEditing = editingId === p.id
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => !isEditing && router.push(`/work/${p.id}`)}
                style={{
                  background: isHovered ? 'rgba(39,39,42,0.5)' : 'rgba(9,9,11,0.8)',
                  border: '1px solid rgba(39,39,42,0.8)',
                  borderRadius: 8,
                  padding: 12,
                  transition: 'background 0.15s, border-color 0.15s',
                  cursor: isHovered ? 'text' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Index */}
                <span className="mc-mono" style={{ position: 'absolute', top: 8, right: 10, fontSize: 9, color: '#27272a' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  {editingId === p.id && editingField === 'title' ? (
                    <input
                      autoFocus
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={() => handleSave(p.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave(p.id)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="mc-mono"
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#d4d4d8',
                        background: 'rgba(9,9,11,0.5)',
                        border: '1px solid rgba(59,130,246,0.3)',
                        borderRadius: 4,
                        padding: '4px 8px',
                        outline: 'none',
                      }}
                    />
                  ) : (
                    <span 
                      onClick={(e) => handleFieldClick(e, p.id, 'title', p.title)}
                      className="mc-mono" 
                      style={{ fontSize: 12, fontWeight: 600, color: '#d4d4d8', flex: 1 }}>
                      {p.title}
                    </span>
                  )}
                  <span className={`mc-badge ${s.cls}`}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                    {s.label}
                  </span>
                </div>

                {editingId === p.id && editingField === 'desc' ? (
                  <textarea
                    autoFocus
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={() => handleSave(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) handleSave(p.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mc-mono"
                    style={{
                      width: '100%',
                      fontSize: 10,
                      color: '#d4d4d8',
                      background: 'rgba(9,9,11,0.5)',
                      border: '1px solid rgba(59,130,246,0.3)',
                      borderRadius: 4,
                      padding: '6px 8px',
                      marginBottom: 10,
                      outline: 'none',
                      fontFamily: 'inherit',
                      minHeight: 40,
                      resize: 'vertical',
                    }}
                  />
                ) : (
                  <p 
                    onClick={(e) => handleFieldClick(e, p.id, 'desc', p.desc)}
                    className="mc-mono" 
                    style={{ fontSize: 10, color: '#52525b', marginBottom: 10, lineHeight: 1.5, cursor: isHovered ? 'text' : 'pointer' }}>
                    {p.desc}
                  </p>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} className="mc-tag" style={{ fontSize: 9 }}>
                      <span style={{ color: '#3b82f6', marginRight: 2 }}>#</span>{tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {open && (
        <ProjectModal onClose={() => setOpen(false)}>
          <ProjectForm onProjectAdded={() => {
            setOpen(false)
            if (onProjectAdded) onProjectAdded()
          }} />
        </ProjectModal>
      )}
    </>
  )
}