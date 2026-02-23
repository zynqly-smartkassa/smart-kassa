/**
 * Global test setup file – runs before every test suite.
 *
 * - Imports the jest-dom custom matchers so assertions like
 *   `toBeInTheDocument()` are available everywhere.
 * - Stubs out Capacitor APIs that are not available in jsdom.
 * - Provides a clean localStorage between tests.
 */

import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';

// ---------------------------------------------------------------------------
// Capacitor stubs
// Capacitor.isNativePlatform() would normally check the user-agent; in tests
// we always run in the web environment so we stub the whole module.
// ---------------------------------------------------------------------------
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(() => false),
  },
}));

vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    set: vi.fn(),
    get: vi.fn(async () => ({ value: null })),
    remove: vi.fn(),
    clear: vi.fn(),
  },
}));

// ---------------------------------------------------------------------------
// localStorage cleanup
// ---------------------------------------------------------------------------
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});
