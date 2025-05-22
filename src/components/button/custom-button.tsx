import type { ReactNode, ButtonHTMLAttributes } from "react"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "icon"
  size?: "sm" | "md" | "lg"
}

export function CustomButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CustomButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
    secondary: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent",
    icon: "bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent rounded-full p-0",
  }

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md",
  }

  // Para botones de tipo icon, no aplicamos los estilos de tamaño estándar
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${variant !== "icon" ? sizeStyles[size] : ""} ${className}`

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  )
}
