'use client'

import { useState, useEffect } from 'react'
import { getEventStatus, getStatusColor, EventStatus } from '@/lib/eventStatus'

interface EventBadgeProps {
  datetime: string | null
}

export function EventBadge({ datetime }: EventBadgeProps) {
  const [status, setStatus] = useState<EventStatus>('upcoming')

  useEffect(() => {
    // Compute status immediately
    setStatus(getEventStatus(datetime))

    // Recompute every minute to ensure accuracy
    const interval = setInterval(() => {
      setStatus(getEventStatus(datetime))
    }, 60000)

    return () => clearInterval(interval)
  }, [datetime])

  const colors = getStatusColor(status)
  const statusLabel = status.toUpperCase()

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded border ${colors.bg} ${colors.border}`}
    >
      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
      <span className={colors.text}>{statusLabel}</span>
    </div>
  )
}
