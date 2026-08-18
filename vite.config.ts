import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages no reescribe rutas hacia el index: al recargar en /EPIK-2.0/horario
 * busca ese archivo, no lo encuentra y devuelve 404. Pages sí sirve 404.html para
 * cualquier ruta desconocida, así que copiar el index con ese nombre hace que la
 * aplicación cargue y el router resuelva la ruta.
 */
function githubPagesFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist')
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
    },
  }
}

// El sitio se publica en https://jayounghoyos.github.io/EPIK-2.0/
export default defineConfig({
  base: '/EPIK-2.0/',
  plugins: [react(), tailwindcss(), githubPagesFallback()],
})
