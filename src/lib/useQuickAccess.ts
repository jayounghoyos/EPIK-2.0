import { useCallback, useEffect, useState } from 'react'
import { defaultShortcuts, destinationCatalogue, maxShortcuts, type Destination } from '../data/destinations'
import { rankByVisits, useVisitCounts } from './useVisitCounts'

const KEY = 'epik:accesos-rapidos'

export type Shortcut = Destination & { source: 'pinned' | 'visited' }

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultShortcuts
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultShortcuts
    // Drop ids that no longer exist, so a renamed route cannot break the sidebar.
    return parsed
      .filter((id): id is string => typeof id === 'string' && destinationCatalogue.some((d) => d.id === id))
      .slice(0, maxShortcuts)
  } catch {
    return defaultShortcuts
  }
}

/**
 * The shortcut list is pinned choices first, then the most visited destinations
 * filling whatever slots remain, capped at six in total.
 *
 * Pinned always wins: an explicit choice outranks a statistic. Otherwise a student
 * who pins something rarely used would watch it get pushed out by traffic, which is
 * the opposite of what pinning means.
 */
export function useQuickAccess() {
  const counts = useVisitCounts()
  const [pinned, setPinned] = useState<string[]>(defaultShortcuts)

  useEffect(() => {
    setPinned(read())
  }, [])

  const save = useCallback((next: string[]) => {
    const trimmed = next.slice(0, maxShortcuts)
    setPinned(trimmed)
    localStorage.setItem(KEY, JSON.stringify(trimmed))
  }, [])

  const reset = useCallback(() => {
    setPinned(defaultShortcuts)
    localStorage.removeItem(KEY)
  }, [])

  const pinnedItems: Shortcut[] = pinned
    .map((id) => destinationCatalogue.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d))
    .map((d) => ({ ...d, source: 'pinned' }))

  const freeSlots = Math.max(0, maxShortcuts - pinnedItems.length)
  const visitedItems: Shortcut[] = rankByVisits(counts, pinned)
    .slice(0, freeSlots)
    .map((d) => ({ ...d, source: 'visited' }))

  return { pinned, shortcuts: [...pinnedItems, ...visitedItems], counts, save, reset }
}
