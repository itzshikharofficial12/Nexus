'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './globals.css'

const navItems = [
  { name: 'Work', href: '/work' },
  { name: 'Acads', href: '/acads' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Settings', href: '/settings' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
            {/* Logo */}
            <div className="px-6 py-8 border-b border-zinc-800">
              <h1 className="text-2xl font-bold text-white">DailyOS</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* User Profile */}
            <div className="px-4 py-4 border-t border-zinc-800">
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-600" />
                <div className="text-left text-sm">
                  <p className="font-medium text-white">User</p>
                  <p className="text-xs text-zinc-400">Profile</p>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
