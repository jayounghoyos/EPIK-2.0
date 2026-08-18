import { useEffect, useState } from 'react'
import { readConsent, saveConsent, type Consent } from '../lib/analytics'
import { Button } from './ui/Button'

/**
 * Aviso de privacidad. El sitio registra clics, desplazamiento y movimiento del
 * cursor de forma anónima para construir mapas de calor, así que se pide permiso
 * antes de activar nada: la analítica no arranca hasta que se acepta.
 *
 * Es una franja al pie y no un modal: bloquear la pantalla para pedir
 * consentimiento es justo el patrón que un curso de IHC señalaría como intrusivo.
 */
export function PrivacyNotice() {
  // undefined = aún no se ha leído el almacenamiento, para no parpadear en el primer render
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined)

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  if (consent !== null) return null

  function decide(value: Consent) {
    saveConsent(value)
    setConsent(value)
  }

  return (
    <aside
      aria-label="Aviso de privacidad"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-[0_-4px_16px_rgba(0,26,48,0.08)] lg:px-8"
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-4">
        <p className="min-w-64 flex-1 text-sm text-gray-700">
          Este prototipo registra de forma anónima los clics y el desplazamiento para estudiar cómo
          se usa la interfaz. No recoge datos personales ni requiere iniciar sesión.{' '}
          <span className="text-gray-600">Tratamiento conforme a la Ley 1581 de 2012.</span>
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => decide('rechazado')}>
            Rechazar
          </Button>
          <Button onClick={() => decide('aceptado')}>Aceptar</Button>
        </div>
      </div>
    </aside>
  )
}
