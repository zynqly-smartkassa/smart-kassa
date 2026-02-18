// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,            
    environment: 'jsdom',
    setupFiles: './__tests__/unit/setupTests.ts',
    exclude: ['node_modules/', '__tests__/e2e'],
    coverage: {
      provider: 'v8',    
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', '__tests__/e2e'],
    },
  },
})
