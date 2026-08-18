import { Icon } from '../../lib/icons'
import { navigation, quickAccess } from './nav'

export function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
}: {
  active: string
  onNavigate: (id: string) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Figura y fondo: al abrir el cajón en móvil, el contenido se atenúa */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-eafit-900/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <nav
        aria-label="Navegación principal"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-gray-200 bg-white
          transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100dvh-4rem)] lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Cerrar menú"
        >
          <Icon name="close" className="size-5" />
        </button>

        <ul className="space-y-1 px-4 pt-6 pb-2">
          {navigation.map((item) => (
            <li key={item.id}>
              <NavButton
                label={item.label}
                icon={item.icon}
                active={active === item.id}
                onClick={() => onNavigate(item.id)}
              />
              {item.children && (
                <ul className="mt-1 space-y-0.5">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => onNavigate(child.id)}
                        aria-current={active === child.id ? 'page' : undefined}
                        className={`w-full rounded-md py-2 pr-3 pl-12 text-left text-sm transition-colors
                          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400
                          ${
                            active === child.id
                              ? 'bg-eafit-50 font-semibold text-eafit-500'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Proximidad: separación mayor que la interna, para que se lea como otro grupo */}
        <div className="mt-8 border-t border-gray-200 px-4 pt-5 pb-8">
          <div className="mb-2 flex items-baseline justify-between px-3">
            <h2 className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
              Accesos rápidos
            </h2>
            <button className="rounded text-xs font-medium text-eafit-500 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400">
              Editar
            </button>
          </div>
          <ul className="space-y-0.5">
            {quickAccess.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  aria-current={active === item.id ? 'page' : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400
                    ${
                      active === item.id
                        ? 'bg-eafit-50 font-semibold text-eafit-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon name={item.icon} className="size-4 shrink-0 text-gray-500" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

function NavButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: Parameters<typeof Icon>[0]['name']
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400
        ${active ? 'bg-eafit-50 font-semibold text-eafit-500' : 'font-medium text-gray-700 hover:bg-gray-50'}`}
    >
      {/* El amarillo institucional solo como superficie, nunca como texto */}
      {active && (
        <span className="absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-full bg-oro-500" />
      )}
      <Icon name={icon} className="size-5 shrink-0" />
      {label}
    </button>
  )
}
