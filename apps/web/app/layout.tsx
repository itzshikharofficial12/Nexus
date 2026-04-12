import "./globals.css";
import { LayoutContent } from "./LayoutContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}