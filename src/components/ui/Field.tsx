import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react'
import { useId } from 'react'

/**
 * El obligatorio se marca con etiqueta explícita, no con un asterisco pegado.
 * El borde usa gray-500 y no un gris decorativo: los grises suaves dan 1.30:1 y
 * 1.65:1, por debajo del 3:1 que exige WCAG 1.4.11 para el contorno de un control.
 */
export function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: (id: string) => ReactNode
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        {label}
        <span
          className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
            required ? 'bg-eafit-50 text-eafit-500' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {required ? 'Obligatorio' : 'Opcional'}
        </span>
      </label>
      {children(id)}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  )
}

const control =
  'w-full rounded-lg border border-gray-500 bg-white px-3.5 py-2.5 text-sm text-gray-900 ' +
  'focus:border-eafit-400 focus:outline-3 focus:outline-offset-1 focus:outline-eafit-100 ' +
  'placeholder:text-gray-500'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={control} {...props} />
)

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={control} {...props} />
)
