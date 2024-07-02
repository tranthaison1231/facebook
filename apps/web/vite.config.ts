import path from 'path'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    include: ['**/*.spec.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  }
})
