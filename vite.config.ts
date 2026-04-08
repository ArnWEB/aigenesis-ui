import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const baseUrl = process.env.VITE_BASE_URL || '/'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: baseUrl,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: ['..'],
    },
  },
})