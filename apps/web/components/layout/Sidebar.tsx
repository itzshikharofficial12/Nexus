'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Acads', href: '/acads' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href)
  }

  return (
    <aside className="w-60 border-r border-zinc-800 bg-zinc-950 flex flex-col h-full">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">DailyOS</h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-t border-zinc-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors duration-200 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
          <div className="text-left min-w-0">
            <p className="text-sm font-semibold text-white truncate">User</p>
            <p className="text-xs text-zinc-500 truncate">Profile</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
