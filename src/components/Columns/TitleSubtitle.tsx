// components/shared/TitleSubtitle.tsx

interface TitleSubtitleProps {
  title: string
  subtitle?: string
}

export default function TitleSubtitle({
  title,
  subtitle,
}: TitleSubtitleProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900">{title}</span>
      {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
    </div>
  )
}
