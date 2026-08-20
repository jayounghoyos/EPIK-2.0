import { useEffect, useState } from 'react'
import { readConsent, saveConsent, type Consent } from '../lib/analytics'
import { Button } from './ui/Button'

/**
 * Privacy notice. The site anonymously records clicks, scrolling and cursor movement
 * to build heatmaps, so permission is asked before anything starts: analytics does
 * not run until the visitor accepts.
 *
 * It is a footer strip rather than a modal: blocking the screen to ask for consent is
 * exactly the pattern an HCI course would flag as intrusive.
 */
export function PrivacyNotice() {
  // undefined = storage not read yet, so the strip does not flash on first render
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
