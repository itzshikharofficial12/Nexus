import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { KeyboardShortcutsProvider } from "@/components/KeyboardShortcutsProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950">
        <KeyboardShortcutsProvider />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          {/* No overflow-auto, no padding — each page controls its own layout */}
          <main className="flex-1 min-w-0 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}