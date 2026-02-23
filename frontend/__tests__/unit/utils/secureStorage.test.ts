/**
 * Tests for secureStorage.ts – SecureStorage and AuthStorage.
 * Capacitor is stubbed in setupTests.ts, so the localStorage branch runs.
 * A separate describe block re-imports the module with isMobile = true to
 * cover the Capacitor Preferences branches.
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SecureStorage, AuthStorage } from '../../../src/utils/secureStorage';

// clear storage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('SecureStorage', () => {
  describe('set() / get()', () => {
    // basic round-trip
    it('stores and retrieves a value by key', async () => {
      await SecureStorage.set('testKey', 'hello');
      const value = await SecureStorage.get('testKey');
      expect(value).toBe('hello');
    });

    it('returns null for a key that was never set', async () => {
      const value = await SecureStorage.get('missing');
      expect(value).toBeNull();
    });

    // second set() on the same key replaces the first value
    it('overwrites an existing value', async () => {
      await SecureStorage.set('key', 'first');
      await SecureStorage.set('key', 'second');
      expect(await SecureStorage.get('key')).toBe('second');
    });
  });

  describe('remove()', () => {
    it('removes an existing key', async () => {
      await SecureStorage.set('toRemove', 'value');
      await SecureStorage.remove('toRemove');
      expect(await SecureStorage.get('toRemove')).toBeNull();
    });

    it('does not throw when removing a key that does not exist', async () => {
      await expect(SecureStorage.remove('nonexistent')).resolves.not.toThrow();
    });
  });

  describe('clear()', () => {
    it('removes all stored keys', async () => {
      await SecureStorage.set('a', '1');
      await SecureStorage.set('b', '2');
      await SecureStorage.clear();

      expect(await SecureStorage.get('a')).toBeNull();
      expect(await SecureStorage.get('b')).toBeNull();
    });
  });
});

describe('AuthStorage', () => {
  describe('setTokens() / getAccessToken()', () => {
    it('stores and retrieves the access token', async () => {
      await AuthStorage.setTokens('my-access-token');
      expect(await AuthStorage.getAccessToken()).toBe('my-access-token');
    });

    it('does not require a refresh token', async () => {
      await expect(AuthStorage.setTokens('access-only')).resolves.not.toThrow();
    });
  });

  describe('setTokens() with refresh token / getRefreshToken()', () => {
    it('stores and retrieves the refresh token when provided', async () => {
      await AuthStorage.setTokens('acc', 'ref-token');
      expect(await AuthStorage.getRefreshToken()).toBe('ref-token');
    });

    it('does not store a refresh token when not provided', async () => {
      await AuthStorage.setTokens('acc');
      expect(await AuthStorage.getRefreshToken()).toBeNull();
    });
  });

  describe('clearTokens()', () => {
    it('removes both the access and refresh token', async () => {
      await AuthStorage.setTokens('acc', 'ref');
      await AuthStorage.clearTokens();

      expect(await AuthStorage.getAccessToken()).toBeNull();
      expect(await AuthStorage.getRefreshToken()).toBeNull();
    });

    it('does not throw when tokens were never set', async () => {
      await expect(AuthStorage.clearTokens()).resolves.not.toThrow();
    });
  });

  describe('token lifecycle', () => {
    // clearTokens() must wipe the access token from storage
    it('returns null for access token after clear', async () => {
      await AuthStorage.setTokens('token-abc');
      await AuthStorage.clearTokens();
      expect(await AuthStorage.getAccessToken()).toBeNull();
    });

    it('can set a new token after clearing', async () => {
      await AuthStorage.setTokens('old');
      await AuthStorage.clearTokens();
      await AuthStorage.setTokens('new');

      expect(await AuthStorage.getAccessToken()).toBe('new');
    });
  });
});

// ---------------------------------------------------------------------------
// Mobile (isMobile = true) branches
// isMobile is a module-level constant, so we must reset modules and re-import
// with a stubbed Capacitor that returns isNativePlatform() = true.
// ---------------------------------------------------------------------------
describe('SecureStorage – mobile (Capacitor Preferences) branch', () => {
  // fresh Preferences spy shared across all tests in this block
  const prefs = {
    set:    vi.fn().mockResolvedValue(undefined),
    get:    vi.fn().mockResolvedValue({ value: 'pref-value' }),
    remove: vi.fn().mockResolvedValue(undefined),
    clear:  vi.fn().mockResolvedValue(undefined),
  };

  let MobileStorage: typeof import('../../../src/utils/secureStorage').SecureStorage;

  beforeEach(async () => {
    vi.resetModules();
    // stub Capacitor to report a native (mobile) platform
    vi.doMock('@capacitor/core', () => ({
      Capacitor: { isNativePlatform: () => true },
    }));
    // stub Preferences with the spy object above
    vi.doMock('@capacitor/preferences', () => ({ Preferences: prefs }));

    const mod = await import('../../../src/utils/secureStorage');
    MobileStorage = mod.SecureStorage;

    // reset call counts between tests
    prefs.set.mockClear();
    prefs.get.mockClear();
    prefs.remove.mockClear();
    prefs.clear.mockClear();
  });

  afterEach(() => {
    vi.resetModules();
  });

  // set() must delegate to Preferences.set on mobile
  it('set() calls Preferences.set with the correct key and value', async () => {
    await MobileStorage.set('myKey', 'myValue');
    expect(prefs.set).toHaveBeenCalledWith({ key: 'myKey', value: 'myValue' });
  });

  // get() must delegate to Preferences.get and return the value string
  it('get() calls Preferences.get and returns the stored value', async () => {
    const result = await MobileStorage.get('myKey');
    expect(prefs.get).toHaveBeenCalledWith({ key: 'myKey' });
    expect(result).toBe('pref-value');
  });

  // remove() must delegate to Preferences.remove
  it('remove() calls Preferences.remove with the correct key', async () => {
    await MobileStorage.remove('myKey');
    expect(prefs.remove).toHaveBeenCalledWith({ key: 'myKey' });
  });

  // clear() must delegate to Preferences.clear
  it('clear() calls Preferences.clear', async () => {
    await MobileStorage.clear();
    expect(prefs.clear).toHaveBeenCalled();
  });
});
