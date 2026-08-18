import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../lib/icons'

/**
 * Región común: cada dominio vive dentro de un contenedor con borde propio.
 * Las tarjetas son deliberadamente idénticas entre sí; la agrupación la produce
 * el contenedor, no un código de color, que una marca de dos tintas no puede dar.
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
