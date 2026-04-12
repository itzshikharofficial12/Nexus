'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { KeyboardShortcutsProvider } from '@/components/KeyboardShortcutsProvider'
import { AuthProvider } from './AuthProvider'
import { ReactNode } from 'react'

export function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login'

  return (
    <AuthProvider>
      <KeyboardShortcutsProvider />
      <div className="flex h-screen overflow-hidden">
        {!isAuthPage && <Sidebar />}
        {/* No overflow-auto, no padding — each page controls its own layout */}
        <main className={`flex-1 min-w-0 overflow-auto ${isAuthPage ? 'w-full' : ''}`}>
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
