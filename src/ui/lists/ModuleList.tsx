import type { Module } from "@/types/modules/module.type"
import ModuleCard from "../card/ModuleCard"

export interface ModuleListProps {
  modules: Module[]
}

export default function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="h-full overflow-auto">
      
      <div className="grid grid-cols-3 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
