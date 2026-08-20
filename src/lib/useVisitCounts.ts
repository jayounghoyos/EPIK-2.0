import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { destinationCatalogue } from '../data/destinations'

const KEY = 'epik:visitas'

export type VisitCounts = Record<string, number>

function read(): VisitCounts {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as VisitCounts
  } catch {
    return {}
  }
}

/**
 * Counts how often each destination is opened, so the shortcuts can fill their
 * spare slots with what this person actually uses.
 *
 * Kept in this browser and never sent anywhere: it is a personal preference, like
 * the pinned shortcuts themselves, and is unrelated to the Clarity consent, which
 * governs analytics leaving the device.
 */
export function useVisitCounts() {
  const { pathname } = useLocation()
  const [counts, setCounts] = useState<VisitCounts>({})

  useEffect(() => {
    setCounts(read())
  }, [])

  useEffect(() => {
    const destination = destinationCatalogue.find((d) => d.path === pathname)
    if (!destination) return

    setCounts((previous) => {
      const next = { ...previous, [destination.id]: (previous[destination.id] ?? 0) + 1 }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [pathname])

  return counts
}

/** Most visited first, ties broken by catalogue order so the list never jitters. */
export function rankByVisits(counts: VisitCounts, excluded: string[]) {
  return destinationCatalogue
    .filter((d) => !excluded.includes(d.id))
    .filter((d) => (counts[d.id] ?? 0) > 0)
    .sort((a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0))
}
