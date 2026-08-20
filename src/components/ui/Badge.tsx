import type { ReactNode } from 'react'

type Intent = 'neutral' | 'success' | 'warning' | 'danger' | 'brand'

/** A status and its explanation can never contradict each other: in the current portal
 *  a row reads green "Approved" while its note says the document is unusable. */
export function Badge({
  intent = 'neutral',
  children,
}: {
  intent?: Intent
  children: ReactNode
}) {
  const styles: Record<Intent, string> = {
    neutral: 'bg-gray-100 text-gray-700',
    brand: 'bg-eafit-50 text-eafit-500',
    success: 'bg-emerald-50 text-exito',
    warning: 'bg-amber-50 text-aviso',
    danger: 'bg-red-50 text-error',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[intent]}`}
    >
      {children}
    </span>
  )
}
