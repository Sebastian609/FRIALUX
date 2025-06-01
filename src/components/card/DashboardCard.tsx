
import { type LucideIcon, Wallet2Icon } from "lucide-react"

interface DashboardCardProps {
  icon?: LucideIcon
  title?: string
  amount?: number
  currency?: string
  actionText?: string
  color?: "white" | "blue" | "purple" | "amber" | "rose"
  onClick?: () => void
}

export default function DashboardCard({
  icon: Icon = Wallet2Icon,
  title = "Ingresos",
  amount = 250.0,
  currency = "S/.",
  actionText = "Ver más",
  color = "white",
  onClick = () => {},
}: DashboardCardProps) {
  // Color mapping for different themes
  const colorMap = {
    white: {
      bg: "bg-white",
      footer: "bg-white",
      iconBg: "bg-orange-500",
    },
    blue: {
      bg: "bg-blue-800",
      footer: "bg-blue-900/30",
      iconBg: "bg-zinc-800",
    },
    purple: {
      bg: "bg-purple-800",
      footer: "bg-purple-900/30",
      iconBg: "bg-zinc-800",
    },
    amber: {
      bg: "bg-amber-800",
      footer: "bg-amber-900/30",
      iconBg: "bg-zinc-800",
    },
    rose: {
      bg: "bg-rose-800",
      footer: "bg-rose-900/30",
      iconBg: "bg-zinc-800",
    },
  }

  const { bg, footer, iconBg } = colorMap[color]

  return (
    <div className={`${bg} shadow-sm h-full gap-4 flex flex-col rounded-md overflow-hidden`}>
      <div className="flex flex-row gap-4 p-4">
        <div>
          <div className={`${iconBg} aspect-square w-16 rounded-md flex justify-center items-center`}>
            <Icon className="text-white w-11 h-11" />
          </div>
        </div>
        <div>
          <div className="">
            <p className="text-orange-600">{title}</p>
          </div>
          <span className="text-[2rem] text-zinc-900 font-bold">
            {currency} {amount}
          </span>
        </div>
      </div>
      <button onClick={onClick} className="text-zinc-400 border-t text-left transition-colors w-full">
        <div className={`${footer} w-full p-4`}>{actionText}</div>
      </button>
    </div>
  )
}

