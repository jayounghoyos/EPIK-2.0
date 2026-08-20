import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { startAnalytics, trackScreen } from './analytics'

/** Starts analytics if consent is already stored, and reports every screen. */
export function useScreenTracking() {
  const { pathname } = useLocation()

  useEffect(() => {
    startAnalytics()
  }, [])

  useEffect(() => {
    trackScreen(pathname)
  }, [pathname])
}
