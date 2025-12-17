import { isMobile } from "../hooks/use-mobile";
import { Preferences } from "@capacitor/preferences";

/**
 * Secure storage utility that uses Capacitor Preferences on mobile
 * and localStorage on web
 */
export const SecureStorage = {
  /**
   * Set a value in secure storage
   */
  async set(key: string, value: string): Promise<void> {
    if (isMobile) {
      await Preferences.set({ key: key, value: value });
    } else {
      localStorage.setItem(key, value);
    }
  },

  /**
   * Get a value from secure storage
   */
  async get(key: string): Promise<string | null> {
    if (isMobile) {
      const { value } = await Preferences.get({ key: key });
      return value;
    } else {
      return localStorage.getItem(key);
    }
  },

  /**
   * Remove a value from secure storage
   */
  async remove(key: string): Promise<void> {
    if (isMobile) {
      await Preferences.remove({ key: key });
    } else {
      localStorage.removeItem(key);
    }
  },

  /**
   * Clear all values from secure storage
   */
  async clear(): Promise<void> {
    if (isMobile) {
      await Preferences.clear();
    } else {
      localStorage.clear();
    }
  },
};

/**
 * Auth storage utility for tokens
 */
export const AuthStorage = {
  /**
   * Save access token
   */
  async setTokens(accessToken: string): Promise<void> {
    await SecureStorage.set("accessToken", accessToken);
  },

  /**
   * Get the access token
   */
  async getAccessToken(): Promise<string | null> {
    return await SecureStorage.get("accessToken");
  },

  async clearAccessToken(): Promise<void> {
    await SecureStorage.remove("accessToken");
  },
};
