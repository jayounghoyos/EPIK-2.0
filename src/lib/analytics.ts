import Clarity from '@microsoft/clarity'

/**
 * Envoltura sobre la herramienta de analítica de comportamiento.
 *
 * Toda la aplicación habla con este módulo y nunca con Clarity directamente, así
 * que cambiar de proveedor más adelante (PostHog, por ejemplo) es tocar un archivo.
 *
 * Qué aporta a un trabajo de IHC: mapas de calor de clic y desplazamiento por
 * pantalla, grabaciones de sesión, y señales como rage clicks y dead clicks, que
 * son evidencia de fricción y no una opinión sobre el diseño.
 *
 * PRIVACIDAD: Clarity empieza a registrar en cuanto se llama a init(), y la API
 * de consentimiento solo frena las cookies si el proyecto está configurado para
 * exigirlo. Por eso aquí no se inicializa nada hasta que la persona acepta: el
 * aviso y el comportamiento del código dicen lo mismo.
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

/** Solo arranca con consentimiento explícito y con identificador configurado. */
export function startAnalytics() {
  if (started || !PROJECT_ID || readConsent() !== 'aceptado') return
  Clarity.init(PROJECT_ID)
  Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' })
  started = true

  // La pantalla vista antes de aceptar no se pierde.
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
 * Recorrido entre pantallas. Emitirlo como evento hace que el flujo sea legible
 * en el panel sin tener que ver grabaciones una por una.
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
