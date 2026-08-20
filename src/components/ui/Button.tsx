import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../../lib/icons'

type Variant = 'primary' | 'secondary'

/**
 * Fitts's law: the primary action is at least 44px tall.
 * Similarity: every primary button is identical to the others, without exception.
 */
export function Button({
  variant = 'primary',
  withArrow = false,
  children,
  className = '',
  ...props
}: {
  variant?: Variant
  withArrow?: boolean
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold ' +
    'transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-eafit-400 disabled:opacity-45'

  const styles: Record<Variant, string> = {
    primary: 'bg-eafit-500 text-white hover:bg-eafit-600',
    secondary: 'border border-gray-500 bg-white text-eafit-500 hover:bg-eafit-50',
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
      {withArrow && <Icon name="arrowRight" className="size-4" />}
    </button>
  )
}
