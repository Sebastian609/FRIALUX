// components/shared/CopyText.tsx

import { useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

interface CopyTextProps {
  text: string
  className?: string
}

export default function CopyText({ text, className = "" }: CopyTextProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition ${className}`}
      title="Copiar al portapapeles"
    >
      <span>{text}</span>
      {copied ? (
        <ClipboardCheck className="w-4 h-4 text-green-500" />
      ) : (
        <Clipboard className="w-4 h-4" />
      )}
    </button>
  )
}
