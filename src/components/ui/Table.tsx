import type { ReactNode } from 'react'

/** Encabezados en español y cifras tabulares. El portal actual mezcla encabezados
 *  en inglés sobre datos en español, y no alinea los números. */
export function Table({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  )
}

export function Th({ children, align = 'left' }: { children: ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      scope="col"
      className={`border-b border-gray-200 bg-gray-50 px-5 py-3 text-[11px] font-semibold tracking-[0.08em] text-gray-600 uppercase ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      {children}
    </th>
  )
}

export function Td({
  children,
  align = 'left',
  numeric = false,
}: {
  children: ReactNode
  align?: 'left' | 'right'
  numeric?: boolean
}) {
  return (
    <td
      className={`border-b border-gray-200 px-5 py-4 text-gray-900 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${numeric ? 'tabular-nums' : ''}`}
    >
      {children}
    </td>
  )
}

export const Tr = ({ children }: { children: ReactNode }) => (
  <tr className="hover:bg-eafit-50/50">{children}</tr>
)
