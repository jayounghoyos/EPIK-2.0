import { useState } from 'react'
import { Outlet } from 'react-router'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main id="contenido" className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
