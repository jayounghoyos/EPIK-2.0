import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { startAnalytics, trackScreen } from './analytics'

/** Arranca la analítica si ya hay consentimiento guardado, y reporta cada pantalla. */
export function useScreenTracking() {
  const { pathname } = useLocation()

  useEffect(() => {
    startAnalytics()
  }, [])

  useEffect(() => {
    trackScreen(pathname)
  }, [pathname])
}
