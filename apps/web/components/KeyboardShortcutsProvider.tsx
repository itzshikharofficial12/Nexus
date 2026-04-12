'use client'

import { useKeyboardShortcuts } from '@/lib/useKeyboardShortcuts'

export function KeyboardShortcutsProvider() {
  useKeyboardShortcuts()
  return null
}
