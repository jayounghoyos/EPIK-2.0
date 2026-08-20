import type { ReactNode } from 'react'

/** Breadcrumb, title and context. Identical on every screen: a header cannot be named
 *  differently depending on where you are, which is what the current portal does. */
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
