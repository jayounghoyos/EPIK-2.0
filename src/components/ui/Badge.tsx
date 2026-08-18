import type { ReactNode } from 'react'

type Intent = 'neutral' | 'success' | 'warning' | 'danger' | 'brand'

/** El estado y su explicación nunca pueden contradecirse: en el portal actual una
 *  fila aparece "Approved" en verde mientras su observación dice que el documento no sirve. */
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
