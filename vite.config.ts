import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages does not rewrite routes to the index: reloading on /EPIK-2.0/horario
 * looks for that file, fails to find it and returns 404. Pages does serve 404.html
 * for any unknown route, so copying the index under that name lets the app load and
 * the router resolve the path.
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

// The site is published at https://jayounghoyos.github.io/EPIK-2.0/
export default defineConfig({
  base: '/EPIK-2.0/',
  plugins: [react(), tailwindcss(), githubPagesFallback()],
})
