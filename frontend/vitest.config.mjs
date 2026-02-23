// vitest.config.js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // mirrors tsconfig paths
      '@': path.resolve(__dirname, './src'),
      // allows bare "constants/..." imports used throughout the codebase
      'constants': path.resolve(__dirname, './constants'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/unit/setupTests.ts',
    exclude: ['node_modules/', '__tests__/e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      // only measure real source files – skip config / generated artifacts
      include: ['src/**/*.{ts,tsx}', 'redux/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        '__tests__/e2e',
        'src/main.tsx',
        'src/App.tsx',
        'src/routing.css',
        'src/index.css',
        '**/*.d.ts',
        // ProtectedRoute.tsx has an unresolved git merge conflict and
        // cannot be parsed by the v8 coverage provider.
        '**/ProtectedRoute.tsx',
      ],
    },
  },
})
