export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    review: "bg-zinc-700/40 text-zinc-300 border-zinc-600/30",
    planned: "bg-zinc-800 text-zinc-400 border-zinc-700",
    done: "bg-zinc-800 text-zinc-400 border-zinc-700",
    upcoming: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
        map[status] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
