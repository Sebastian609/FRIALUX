import type { ReactNode } from "react"

interface CustomBadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "info"
  className?: string
}

export function CustomBadge({ children, variant = "default", className = "" }: CustomBadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  return <span className={combinedStyles}>{children}</span>
}
