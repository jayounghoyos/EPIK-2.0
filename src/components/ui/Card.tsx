import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../lib/icons'

/**
 * Common region: each domain lives inside a container with its own border.
 * The cards are deliberately identical; grouping comes from the boundary, not from
 * colour coding, which a two-ink brand cannot supply.
 */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-gray-200 bg-white ${className}`}>
      {children}
    </section>
  )
}

export function CardHeader({
  icon,
  title,
  aside,
}: {
  icon: IconName
  title: string
  aside?: ReactNode
}) {
  return (
    <header className="flex items-center gap-2.5 px-6 pt-5 pb-4">
      <Icon name={icon} className="size-5 text-eafit-500" />
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {aside && <div className="ml-auto text-sm text-gray-500">{aside}</div>}
    </header>
  )
}
