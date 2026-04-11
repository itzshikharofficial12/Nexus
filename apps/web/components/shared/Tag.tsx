export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-zinc-800 text-zinc-400 border border-zinc-700">
      {label}
    </span>
  )
}
