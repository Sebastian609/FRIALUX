// components/shared/TitleSubtitle.tsx

interface NumberColumnProps {
  value: number

}

export default function NumberColumn({
  value

}: NumberColumnProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900">{value}</span>
    
    </div>
  )
}
