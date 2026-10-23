import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  accent?: 'navy' | 'orange' | 'blue'
}

const accentStyles = {
  navy: 'bg-navy text-white',
  orange: 'bg-accent text-white',
  blue: 'bg-blue-secondary text-white',
}

export function StatCard({ label, value, icon: Icon, accent = 'navy' }: StatCardProps) {
  return (
    <div className="rounded-sm border border-[#E8DFD3] bg-white p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-in overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent/80" />
      <div className="flex items-start justify-between pt-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text">{label}</p>
          <p className="mt-2 font-serif-display text-3xl font-bold text-navy">{value}</p>
        </div>
        <div className={`rounded-full p-2.5 shadow-sm ${accentStyles[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  )
}
