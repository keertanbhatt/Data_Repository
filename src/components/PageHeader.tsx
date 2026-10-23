import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="h-1 w-12 bg-accent mb-3" />
        <h1 className="font-serif-display text-2xl md:text-3xl font-bold text-navy">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-secondary-text leading-relaxed max-w-2xl">{subtitle}</p>}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
