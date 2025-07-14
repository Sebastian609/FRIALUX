// components/shazinc/Button.tsx
import { EyeIcon } from "lucide-react"

interface ShowButtonProps {
  onClick: () => void
  title?: string
}

export default function ShowButton({ onClick, title = "Eliminar" }: ShowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-700 transition-all duration-200 hover:scale-105"
      title={title}
    >
      <EyeIcon className="h-4 w-4" />
    </button>
  )
}
