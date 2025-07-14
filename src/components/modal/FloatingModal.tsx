import { ReactNode } from "react"
import { X } from "lucide-react"

type FloatingModalProps = {
  title?: string
  onClose: () => void
  children: ReactNode
}

export default function FloatingModal({ title, onClose, children }: FloatingModalProps) {
  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
