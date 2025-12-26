/**
 * Singleton Pattern to eiter create or return the unique_device_id
 * @returns unique_device_id which is used in the session table to identify refresh tokens depending on the type of device used by the user, so the user can log in on different devices
 */

export function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem("unique_device_id");
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Erzeugt z.B. "123e4567-e89b-12d3-a456-426614174000"
    localStorage.setItem("unique_device_id", deviceId);
  }
  return deviceId;
}
