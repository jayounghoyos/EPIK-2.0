import { Icon } from '../../lib/icons'
import { student } from '../../data/student'

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

      <div className="mx-auto hidden w-full max-w-xl md:block">
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

      <button className="ml-auto flex items-center gap-2.5 rounded-lg py-1 pr-2 pl-1 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500">
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
        <Icon name="chevronDown" className="size-4 text-white/80" />
      </button>
    </header>
  )
}
