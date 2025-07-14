// components/shared/EditButton.tsx
import { Edit } from "lucide-react"

interface EditButtonProps {
  onClick: () => void
  title?: string
}

export default function EditButton({ onClick, title = "Editar" }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:scale-105"
      title={title}
    >
      <Edit className="h-4 w-4" />
    </button>
  )
}
