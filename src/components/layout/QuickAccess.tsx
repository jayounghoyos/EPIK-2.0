import { useState } from 'react'
import { NavLink } from 'react-router'
import { Icon } from '../../lib/icons'
import { destinationCatalogue, maxShortcuts } from '../../data/destinations'
import { useQuickAccess } from '../../lib/useQuickAccess'

/**
 * Replaces the empty Favorites and the broken Recent Places of the current portal,
 * where the feature exists but was reported as too complex to understand.
 *
 * Pinned entries are marked with a small pin; the rest arrived on their own from
 * how often they are opened. The difference is stated once in a caption rather than
 * repeated on every row, so the list stays quiet.
 */
export function QuickAccess({ onNavigate }: { onNavigate: () => void }) {
  const { pinned, shortcuts, counts, save, reset } = useQuickAccess()
  const [editing, setEditing] = useState(false)

  function toggle(id: string) {
    save(pinned.includes(id) ? pinned.filter((value) => value !== id) : [...pinned, id])
  }

  return (
    <div data-tour="quick-access" className="mt-8 border-t border-gray-200 px-4 pt-5 pb-8">
      <div className="mb-2 flex items-baseline justify-between px-3">
        <h2 className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
          Accesos rápidos
        </h2>
        <button
          onClick={() => setEditing((value) => !value)}
          className="rounded text-xs font-medium text-eafit-500 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
        >
          {editing ? 'Listo' : 'Editar'}
        </button>
      </div>

      {editing ? (
        <div className="px-1">
          <p className="mb-3 px-2 text-xs text-gray-600">
            Ancla hasta {maxShortcuts}. Los espacios que dejes libres se llenan solos con lo que
            más abres.
          </p>
          <ul className="space-y-0.5">
            {destinationCatalogue.map((destination) => {
              const isPinned = pinned.includes(destination.id)
              const full = pinned.length >= maxShortcuts && !isPinned
              return (
                <li key={destination.id}>
                  <button
                    onClick={() => toggle(destination.id)}
                    disabled={full}
                    aria-pressed={isPinned}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
                      isPinned ? 'bg-eafit-50 font-semibold text-eafit-500' : 'text-gray-700 hover:bg-gray-50'
                    } ${full ? 'cursor-not-allowed opacity-40' : ''}`}
                  >
                    <Icon
                      name={isPinned ? 'pinned' : 'plus'}
                      className={`size-4 shrink-0 ${isPinned ? 'text-eafit-500' : 'text-gray-400'}`}
                    />
                    <span className="flex-1">{destination.label}</span>
                    {(counts[destination.id] ?? 0) > 0 && (
                      <span className="text-[11px] tabular-nums text-gray-500">
                        {counts[destination.id]}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            onClick={reset}
            className="mt-3 px-3 text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline"
          >
            Restablecer
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-0.5">
            {shortcuts.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
                      isActive
                        ? 'bg-eafit-50 font-semibold text-eafit-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon name={item.icon} className="size-4 shrink-0 text-gray-500" />
                  <span className="flex-1">{item.label}</span>
                  {/* The one visual difference: anclados carry a pin, automáticos do not */}
                  {item.source === 'pinned' && (
                    <Icon name="pinned" className="size-3.5 shrink-0 text-eafit-400" />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {shortcuts.some((item) => item.source === 'visited') && (
            <p className="mt-3 flex items-center gap-1.5 px-3 text-[11px] text-gray-500">
              <Icon name="pinned" className="size-3 shrink-0 text-eafit-400" />
              Anclados por ti. El resto aparece según lo que más abres.
            </p>
          )}
        </>
      )}
    </div>
  )
}
