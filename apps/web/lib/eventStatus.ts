export type EventStatus = 'upcoming' | 'live' | 'done'

export function getEventStatus(eventDatetime: string | null): EventStatus {
  if (!eventDatetime) return 'upcoming'

  const now = new Date()
  const eventTime = new Date(eventDatetime)

  // Calculate difference in milliseconds
  const diffMs = eventTime.getTime() - now.getTime()
  const diffMins = diffMs / (1000 * 60)

  // If event is in the past
  if (diffMs < 0) {
    return 'done'
  }

  // If event is within 30 minutes (live)
  if (diffMins <= 30 && diffMs >= 0) {
    return 'live'
  }

  // If event is in the future
  return 'upcoming'
}

export function getStatusColor(status: EventStatus): {
  bg: string
  border: string
  dot: string
  text: string
} {
  switch (status) {
    case 'live':
      return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        dot: 'bg-green-500',
        text: 'text-green-400',
      }
    case 'done':
      return {
        bg: 'bg-zinc-700/30',
        border: 'border-zinc-600/30',
        dot: 'bg-zinc-500',
        text: 'text-zinc-400',
      }
    case 'upcoming':
      return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        dot: 'bg-blue-500',
        text: 'text-blue-400',
      }
  }
}
