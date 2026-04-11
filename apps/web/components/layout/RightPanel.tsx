'use client'

import QuickStats from '@/features/work/components/QuickStats'
import IdeasPanel from '@/features/work/components/IdeasPanel'
import LinksPanel from '@/features/work/components/LinksPanel'

export default function RightPanel() {
  return (
    <div className="space-y-6">
      <QuickStats />
      <IdeasPanel />
      <LinksPanel />
    </div>
  )
}
