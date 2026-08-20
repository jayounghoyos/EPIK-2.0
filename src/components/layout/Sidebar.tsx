import { NavLink } from 'react-router'
import { Icon, type IconName } from '../../lib/icons'
import { navigation } from './nav'
import { QuickAccess } from './QuickAccess'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Figure and ground: opening the drawer on mobile dims the content behind it */}
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
              {item.path ? (
                <TopLink to={item.path} icon={item.icon} label={item.label} onNavigate={onClose} />
              ) : (
                <p className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-700">
                  <Icon name={item.icon} className="size-5 shrink-0" />
                  {item.label}
                </p>
              )}

              {item.children && (
                <ul className="mt-1 space-y-0.5">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <NavLink
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block rounded-md py-2 pr-3 pl-12 text-sm transition-colors
                           focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
                             isActive
                               ? 'bg-eafit-50 font-semibold text-eafit-500'
                               : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                           }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <QuickAccess onNavigate={onClose} />

      </nav>
    </>
  )
}

function TopLink({
  to,
  icon,
  label,
  onNavigate,
}: {
  to: string
  icon: IconName
  label: string
  onNavigate: () => void
}) {
  return (
    <NavLink
      to={to}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors
         focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
           isActive ? 'bg-eafit-50 font-semibold text-eafit-500' : 'font-medium text-gray-700 hover:bg-gray-50'
         }`
      }
    >
      {({ isActive }) => (
        <>
          {/* The institutional yellow only as a surface, never as text */}
          {isActive && (
            <span className="absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-full bg-oro-500" />
          )}
          <Icon name={icon} className="size-5 shrink-0" />
          {label}
        </>
      )}
    </NavLink>
  )
}
