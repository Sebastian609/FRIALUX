// components/shared/ConfigButton.tsx
import { Settings } from "lucide-react"

interface ConfigButtonProps {
  onClick: () => void
  title?: string
}

export default function ConfigButton({ onClick, title = "Eliminar" }: ConfigButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200 hover:scale-105"
      title={title}
    >
      <Settings className="h-4 w-4" />
    </button>
  )
}
