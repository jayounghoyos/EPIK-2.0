import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Icon, type IconName } from '../../lib/icons'
import { student } from '../../data/student'

const items: { id: string; label: string; icon: IconName; to?: string }[] = [
  { id: 'perfil', label: 'Mi perfil', icon: 'clipboard', to: '/perfil' },
  { id: 'monitor', label: 'Perfil de monitor', icon: 'graduation', to: '/perfil-monitor' },
  { id: 'salir', label: 'Cerrar sesión', icon: 'arrowRight' },
]

/**
 * The user menu the top bar was missing: the chevron looked interactive but did
 * nothing, which Clarity would report as a dead click.
 *
 * Closes on outside click and on Escape, and returns focus to the trigger, so it
 * can be operated entirely from the keyboard.
 */
export function UserMenu() {
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={container} data-tour="user-menu" className="relative ml-auto">
      <button
        ref={trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 rounded-lg py-1 pr-2 pl-1 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500"
      >
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-oro-500 text-[13px] font-bold text-gray-900"
        >
          {student.initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-semibold text-white">{student.fullName}</span>
          <span className="block text-xs text-white/75">{student.username}</span>
        </span>
        <Icon
          name="chevronDown"
          className={`size-4 text-white/80 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          <div className="border-b border-gray-200 px-4 py-3">
            <p className="font-semibold text-gray-900">{student.fullName}</p>
            <p className="text-sm text-gray-600">
              {student.username} · ID <span className="tabular-nums">{student.maskedId}</span>
            </p>
          </div>
          <ul className="p-1.5">
            {items.map((item) => {
              const content = (
                <>
                  <Icon name={item.icon} className="size-4 shrink-0 text-gray-500" />
                  {item.label}
                </>
              )
              const className =
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-eafit-50 hover:text-eafit-500 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400'

              return (
                <li key={item.id} role="none">
                  {item.to ? (
                    <Link role="menuitem" to={item.to} onClick={() => setOpen(false)} className={className}>
                      {content}
                    </Link>
                  ) : (
                    <button role="menuitem" className={className}>
                      {content}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
