// components/shared/DateTimeColumn.tsx
import dayjs from "dayjs"

interface DateTimeColumnProps {
  date: Date
}

export default function DateTimeColumn({ date }: DateTimeColumnProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-900">
        {dayjs(date).format("DD/MM/YYYY HH:mm")}
      </span>
      <span className="text-xs text-gray-500">{dayjs(date).format("dddd")}</span>
    </div>
  )
}
