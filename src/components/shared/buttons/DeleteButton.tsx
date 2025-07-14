// components/shared/DeleteButton.tsx
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
  onClick: () => void
  title?: string
}

export default function DeleteButton({ onClick, title = "Eliminar" }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:scale-105"
      title={title}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
