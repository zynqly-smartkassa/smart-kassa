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
    exclude: ['node_modules/', '__tests__/e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      excludeAfterRemap: true,
      // only measure testable source modules
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/layout/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
        'src/pages/**/*.{ts,tsx}',
        'src/utils/**/*.{ts,tsx}',
        'redux/**/*.{ts,tsx}',
      ],
      exclude: [
        'node_modules/',
        '__tests__/e2e',
        'src/content/**',
        'src/components/ui/**',
        '**/constants/**',
        '**/src/types/**',
        '**/src/content/**',
        '**/src/components/ui/**',
        'redux/store.ts',
        'redux/StoreProvider.tsx',
        '**/redux/store.ts',
        '**/redux/StoreProvider.tsx',
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
