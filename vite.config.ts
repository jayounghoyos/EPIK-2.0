import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// El sitio se publica en https://jayounghoyos.github.io/EPIK-2.0/
// por lo que Vite necesita ese prefijo para resolver los assets.
export default defineConfig({
  base: '/EPIK-2.0/',
  plugins: [react(), tailwindcss()],
})
