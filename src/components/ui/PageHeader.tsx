import type { ReactNode } from 'react'

/** Miga de pan, título y contexto. Idéntico en todas las pantallas: la cabecera
 *  no puede llamarse distinto según dónde estés, que es lo que hace el portal actual. */
export function PageHeader({
  breadcrumb,
  title,
  meta,
  actions,
}: {
  breadcrumb?: string
  title: string
  meta?: ReactNode
  actions?: ReactNode
}) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        {breadcrumb && <p className="text-sm text-gray-600">{breadcrumb}</p>}
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">{title}</h1>
        {meta && <p className="mt-2 text-sm text-gray-600">{meta}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </header>
  )
}
