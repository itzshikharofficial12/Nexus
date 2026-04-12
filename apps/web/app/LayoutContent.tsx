'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { KeyboardShortcutsProvider } from '@/components/KeyboardShortcutsProvider'
import { AuthProvider } from './AuthProvider'
import { ReactNode } from 'react'

export function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login'

  if (isAuthPage) {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <KeyboardShortcutsProvider />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
