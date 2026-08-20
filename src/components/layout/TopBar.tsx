import { Icon } from '../../lib/icons'
import { HelpButton } from './HelpButton'
import { UserMenu } from './UserMenu'

/**
 * Jakob's law: search on top and the user menu on the right, where a student already
 * expects them. Replaces the "▾Student" dropdown, which is today the portal's only
 * global navigation.
 */
export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 bg-eafit-500 px-4 lg:px-6">
      <button
        onClick={onOpenMenu}
        className="rounded-md p-2 text-white/90 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500 lg:hidden"
        aria-label="Abrir menú"
      >
        <Icon name="menu" className="size-5" />
      </button>

      <a href="#contenido" className="shrink-0 leading-none">
        <span className="block text-[10px] font-medium tracking-[0.22em] text-white/80">
          UNIVERSIDAD
        </span>
        <span className="block text-xl font-extrabold tracking-tight text-white">EAFIT</span>
      </a>

      <div data-tour="search" className="mx-auto hidden w-full max-w-xl md:block">
        <label className="sr-only" htmlFor="buscador">
          Buscar en el portal
        </label>
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5">
          <Icon name="search" className="size-4 shrink-0 text-gray-500" />
          <input
            id="buscador"
            type="search"
            placeholder="Buscar trámites, materias o certificados"
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <HelpButton />
        <UserMenu />
      </div>
    </header>
  )
}
