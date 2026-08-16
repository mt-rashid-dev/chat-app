import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      // Use polling for environments where file-system events aren't delivered
      // (WSL on Windows, network mounts, Docker volumes, etc.)
      usePolling: true,
      interval: 100
    }
  }
})
