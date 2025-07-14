// components/shared/StatusBadge.tsx

interface StatusBadgeProps {
  active: boolean
  labels?: {
    active: string
    inactive: string
  }
}

export default function StatusBadge({
  active,
  labels = { active: "Activo", inactive: "Inactivo" },
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        active
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-gray-100 text-gray-800 border border-gray-200"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          active ? "bg-green-400" : "bg-gray-400"
        }`}
      ></span>
      {active ? labels.active : labels.inactive}
    </span>
  )
}
