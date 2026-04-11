"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MC_STYLES } from "@/features/work/components/mc-styles";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "WORK", href: "/work" },
  { label: "ACADS", href: "/acads" },
  { label: "CALENDAR", href: "/calendar" },
  { label: "SETTINGS", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <style>{MC_STYLES}</style>

      <aside className="w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full">
        
        {/* HEADER */}
        <div className="px-5 py-6 border-b border-zinc-800 flex items-center justify-between">
          <span className="mc-mono text-sm font-semibold text-zinc-100 tracking-wide">
            NEXUS
          </span>
          <span className="text-xs text-zinc-400/80 mc-mono tracking-wide">v1.0</span>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mc-mono flex items-center justify-between px-3 py-2 text-xs tracking-wide border border-transparent transition-all ${
                    active
                      ? "text-blue-400 border-zinc-800 bg-zinc-900"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* indicator */}
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: active ? "#3b82f6" : "#27272a",
                      }}
                    />
                    {item.label}
                  </div>

                  {/* index */}
                  <span className="text-xs text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="px-4 py-4 border-t border-zinc-800">
          <div className="mc-mono text-xs text-zinc-400 tracking-wide uppercase">
            SYSTEM STATUS
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-300 tracking-wide">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            OPERATIONAL
          </div>
        </div>
      </aside>
    </>
  );
}