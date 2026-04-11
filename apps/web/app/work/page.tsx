'use client'

import { useState } from 'react'
import { GreetingHeader } from '@/features/work/components/GreetingHeader'
import { Hero } from '@/features/work/components/Hero'
import { TaskList } from '@/features/work/components/TaskListRefactored'
import { FocusTimer } from '@/features/work/components/FocusTimerRefactored'
import { ProjectGrid } from '@/features/work/components/ProjectGrid'
import { ScheduleList } from '@/features/work/components/ScheduleList'
import { QuickStats } from '@/features/work/components/QuickStatsRefactored'
import { IdeasPanel } from '@/features/work/components/IdeasPanelRefactored'
import { LinksPanel } from '@/features/work/components/LinksPanelRefactored'

const PROJECTS = [
  { id: 1, title: 'DailyOS Core',        desc: 'Main app shell, routing, and layout system',  status: 'active',  tags: ['Next.js', 'TypeScript'] },
  { id: 2, title: 'Auth Service',         desc: 'Supabase integration, session handling',       status: 'review',  tags: ['Supabase', 'JWT']        },
  { id: 3, title: 'Analytics Pipeline',   desc: 'Event tracking and dashboard metrics',         status: 'planned', tags: ['Postgres', 'Cron']       },
  { id: 4, title: 'Mobile PWA',           desc: 'Offline-first progressive web app',            status: 'active',  tags: ['PWA', 'IndexedDB']       },
]

const SCHEDULE = [
  { label: 'Standup call',        time: '9:00 AM',   type: 'upcoming' },
  { label: 'Design review',       time: '11:30 AM',  type: 'upcoming' },
  { label: 'Merged feature/auth', time: 'Yesterday', type: 'done'     },
  { label: 'Deployed v1.4.2',     time: 'Yesterday', type: 'done'     },
  { label: 'Team retrospective',  time: 'Tomorrow',  type: 'upcoming' },
]

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com'   },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Figma',    href: 'https://figma.com'    },
  { label: 'Notion',   href: 'https://notion.so'    },
  { label: 'Vercel',   href: 'https://vercel.com'   },
]

const STATS = [
  { label: 'Tasks Done', value: '24'  },
  { label: 'PRs Merged', value: '8'   },
  { label: 'Focus Hrs',  value: '3.5' },
  { label: 'Streak',     value: '12d' },
]

export default function WorkPage() {
  const [newTask, setNewTask] = useState('')
  const [goal, setGoal]       = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 20,
        background: '#09090b',
        minHeight: '100vh',
        fontFamily: 'Syne, sans-serif',
      }}
    >
      {/* GREETING HEADER */}
      <div style={{ marginBottom: 24 }}>
        <GreetingHeader />
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          display: 'flex',
          gap: 16,
        }}
      >
        {/* LEFT MAIN */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Hero goal={goal} onGoalChange={setGoal} />
            <TaskList newTask={newTask} onNewTaskChange={setNewTask} />
            <FocusTimer />
            <ProjectGrid projects={PROJECTS} />
            <ScheduleList schedule={SCHEDULE} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <QuickStats stats={STATS} />
          <IdeasPanel />
          <LinksPanel links={LINKS} />
        </div>
      </div>
    </div>
  )
}