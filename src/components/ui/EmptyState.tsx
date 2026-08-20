import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../lib/icons'

/**
 * A well-made empty state answers three things: what happened, why that is fine, and
 * what can be done now. The current portal leaves blank pages, or a lone centred
 * sentence on a 1920x1080 screen, or prints "(CLOB) En este momento no tiene información."
 */
export function EmptyState({
  icon = 'file',
  title,
  body,
  action,
}: {
  icon?: IconName
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-eafit-50">
        <Icon name={icon} className="size-6 text-eafit-500" />
      </span>
      <h2 className="mt-4 text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
