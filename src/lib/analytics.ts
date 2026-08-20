import Clarity from '@microsoft/clarity'

/**
 * Wrapper around the behavioural analytics provider.
 *
 * The whole app talks to this module and never to Clarity directly, so switching
 * provider later (to PostHog, say) means editing one file.
 *
 * What it gives an HCI project: click and scroll heatmaps per screen, session
 * recordings, and signals such as rage clicks and dead clicks, which are evidence
 * of friction rather than an opinion about the design.
 *
 * PRIVACY: Clarity starts recording the moment init() is called, and the consent
 * API only holds back cookies if the project is configured to require it. Nothing
 * is initialised here until the visitor accepts, so the notice and the code say
 * the same thing.
 */

const PROJECT_ID = import.meta.env.VITE_CLARITY_ID as string | undefined

export const CONSENT_KEY = 'epik:consentimiento-analitica'
export type Consent = 'aceptado' | 'rechazado'

let started = false
let pendingScreen: string | null = null

export function readConsent(): Consent | null {
  const value = localStorage.getItem(CONSENT_KEY)
  return value === 'aceptado' || value === 'rechazado' ? value : null
}

/** Starts only with explicit consent and a configured project id. */
export function startAnalytics() {
  if (started || !PROJECT_ID || readConsent() !== 'aceptado') return
  Clarity.init(PROJECT_ID)
  Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' })
  started = true

  // The screen viewed before accepting is not lost.
  if (pendingScreen) {
    trackScreen(pendingScreen)
    pendingScreen = null
  }
}

export function saveConsent(value: Consent) {
  localStorage.setItem(CONSENT_KEY, value)
  if (value === 'aceptado') startAnalytics()
}

/**
 * Screen-to-screen journey. Emitting it as an event makes the flow readable in the
 * dashboard without watching recordings one by one.
 */
export function trackScreen(path: string) {
  if (!started) {
    pendingScreen = path
    return
  }
  const name = path === '/' ? 'inicio' : path.replace(/^\//, '').replace(/\//g, '-')
  Clarity.event(`pantalla:${name}`)
  Clarity.setTag('pantalla', name)
}
