import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: If your existing vite.config.js has other plugins (e.g. tailwind),
// keep them and only add the `server.proxy` block below.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})