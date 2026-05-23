import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the app is served from /token-price-calculator/.
// Locally (dev/preview) it stays at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/token-price-calculator/' : '/',
  plugins: [react()],
}))
