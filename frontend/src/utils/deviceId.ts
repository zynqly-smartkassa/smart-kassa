import { Preferences } from "@capacitor/preferences";
import { isMobile } from "../hooks/layout/use-mobile";

/**
 * a constant for the key to get the device id from the local storage or the prefrences (from capacitor) on mobile
 */
export const device_id_key_name = "unique_device_id";

/**
 * Singleton Pattern to eiter create or return the unique_device_id
 * @returns unique_device_id which is used in the session table to identify refresh tokens depending on the type of device used by the user, so the user can log in on different devices
 */
export async function getOrCreateDeviceId() {
  let deviceId = await getDeviceId();
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Erzeugt z.B. "123e4567-e89b-12d3-a456-426614174000"
    if (isMobile) {
      await Preferences.set({ key: device_id_key_name, value: deviceId });
    } else {
      localStorage.setItem(device_id_key_name, deviceId);
    }
  }
  return deviceId;
}

async function getDeviceId() {
  if (isMobile) {
    return await Preferences.get({ key: device_id_key_name });
  } else {
    return localStorage.getItem(device_id_key_name);
  }
}
