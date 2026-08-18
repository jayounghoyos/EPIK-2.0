import { useState } from 'react'
import { TopBar } from './components/layout/TopBar'
import { Sidebar } from './components/layout/Sidebar'
import { Home } from './screens/Home'

export default function App() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(id: string) {
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-eafit-500"
      >
        Saltar al contenido
      </a>

      <TopBar onOpenMenu={() => setMenuOpen(true)} />

      <div className="lg:flex">
        <Sidebar
          active={active}
          onNavigate={navigate}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <main id="contenido" className="min-w-0 flex-1">
          {active === 'inicio' ? (
            <Home />
          ) : (
            <div className="mx-auto max-w-[1180px] px-4 py-16 lg:px-8">
              <p className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-600">
                Esta pantalla todavía no está construida. Por ahora solo existe Inicio.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
