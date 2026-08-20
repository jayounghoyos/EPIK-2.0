import { useCallback, useEffect, useState } from 'react'
import { defaultShortcuts, destinationCatalogue, maxShortcuts } from '../data/destinations'

const KEY = 'epik:accesos-rapidos'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultShortcuts
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultShortcuts
    // Drop ids that no longer exist, so a renamed route cannot break the sidebar.
    const valid = parsed.filter(
      (id): id is string => typeof id === 'string' && destinationCatalogue.some((d) => d.id === id),
    )
    return valid.length ? valid.slice(0, maxShortcuts) : defaultShortcuts
  } catch {
    return defaultShortcuts
  }
}

/** Shortcuts chosen by the student, kept in the browser. No account required. */
export function useQuickAccess() {
  const [ids, setIds] = useState<string[]>(defaultShortcuts)

  useEffect(() => {
    setIds(read())
  }, [])

  const save = useCallback((next: string[]) => {
    const trimmed = next.slice(0, maxShortcuts)
    setIds(trimmed)
    localStorage.setItem(KEY, JSON.stringify(trimmed))
  }, [])

  const reset = useCallback(() => {
    setIds(defaultShortcuts)
    localStorage.removeItem(KEY)
  }, [])

  const shortcuts = ids
    .map((id) => destinationCatalogue.find((d) => d.id === id))
    .filter((d): d is (typeof destinationCatalogue)[number] => Boolean(d))

  return { ids, shortcuts, save, reset }
}
