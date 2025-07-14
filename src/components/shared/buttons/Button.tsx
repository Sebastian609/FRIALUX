"use client"

import { Loader2, type LucideIcon } from "lucide-react"
import type React from "react"

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "outline" | "ghost" | "link"
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
  fullWidth?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  iconOnly?: boolean
  gradient?: boolean
  shadow?: boolean
  rounded?: boolean
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconOnly = false,
  gradient = false,
  shadow = true,
  rounded = false,
}: ButtonProps) {
  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}
    ${rounded ? "rounded-full" : "rounded-lg"}
  `

  // Size variants
  const sizeClasses = {
    xs: `px-2.5 py-1.5 text-xs ${iconOnly ? "w-6 h-6 p-0" : ""}`,
    sm: `px-3 py-2 text-sm ${iconOnly ? "w-8 h-8 p-0" : ""}`,
    md: `px-4 py-2.5 text-sm ${iconOnly ? "w-10 h-10 p-0" : ""}`,
    lg: `px-6 py-3 text-base ${iconOnly ? "w-12 h-12 p-0" : ""}`,
    xl: `px-8 py-4 text-lg ${iconOnly ? "w-14 h-14 p-0" : ""}`,
  }

  // Variant classes
  const getVariantClasses = (variant: ButtonVariant, gradient: boolean) => {
    const variants = {
      primary: gradient
        ? `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
           text-white focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
        : `bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500
           ${shadow ? "shadow-md hover:shadow-lg" : ""} transform hover:-translate-y-0.5`,

      secondary: gradient
        ? `bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 
           text-gray-800 focus:ring-gray-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`
        : `bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 focus:ring-gray-400
           ${shadow ? "shadow-sm hover:shadow-md" : ""} transform hover:-translate-y-0.5`,

      danger: gradient
        ? `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
           text-white focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
        : `bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500
           ${shadow ? "shadow-md hover:shadow-lg" : ""} transform hover:-translate-y-0.5`,

      success: gradient
        ? `bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
           text-white focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
        : `bg-green-600 hover:bg-green-700 active:bg-green-800 text-white focus:ring-green-500
           ${shadow ? "shadow-md hover:shadow-lg" : ""} transform hover:-translate-y-0.5`,

      warning: gradient
        ? `bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 
           text-white focus:ring-yellow-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
        : `bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white focus:ring-yellow-500
           ${shadow ? "shadow-md hover:shadow-lg" : ""} transform hover:-translate-y-0.5`,

      outline: `border-2 border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100 
                text-gray-700 focus:ring-gray-400 hover:border-gray-400 transform hover:-translate-y-0.5`,

      ghost: `bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 
              focus:ring-gray-400 transform hover:-translate-y-0.5`,

      link: `bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-700 
             underline-offset-4 hover:underline focus:ring-blue-500 p-0`,
    }

    return variants[variant]
  }

  // Disabled state
  const disabledClasses = disabled || loading ? "opacity-50 transform-none hover:shadow-none hover:translate-y-0" : ""

  // Icon size based on button size
  const getIconSize = (size: ButtonSize) => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    }
    return sizes[size]
  }

  const iconSize = getIconSize(size)

  const finalClassName = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${getVariantClasses(variant, gradient)}
    ${disabledClasses}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim()

  return (
    <button type={type} onClick={onClick} className={finalClassName} disabled={disabled || loading}>
      {/* Loading spinner */}
      {loading && <Loader2 className={`${iconSize} animate-spin ${!iconOnly ? "mr-2" : ""}`} />}

      {/* Left icon */}
      {!loading && LeftIcon && <LeftIcon className={`${iconSize} ${!iconOnly ? "mr-2" : ""}`} />}

      {/* Button content */}
      {!iconOnly && <span className={loading ? "opacity-0" : ""}>{children}</span>}

      {/* Right icon */}
      {!loading && RightIcon && !iconOnly && <RightIcon className={`${iconSize} ml-2`} />}

      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200"></span>
      </span>
    </button>
  )
}
