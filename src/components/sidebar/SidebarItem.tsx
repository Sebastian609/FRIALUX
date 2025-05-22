import type React from "react"

interface SidebarItemProps {
  icon: React.ReactNode
  name: string
}

export default function SidebarItem({ icon, name }: SidebarItemProps) {
  return (
    <div className="group relative">
      <div className="aspect-square rounded-md overflow-hidden bg-orange-500 hover:scale-90 transition-all hover:shadow-md hover:shadow-orange-400 hover:bg-orange-700 flex items-center justify-center p-3 text-white">
        {icon}
      </div>

      {/* Tooltip */}
      <div className="absolute rounded-full left-2 translate-y-12 translate-x-12 bottom-full mb-2 px-2 py-1 bg-orange-500 text-white border-2 border-white text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
        {name}
  
      </div>
    </div>
  )
}

