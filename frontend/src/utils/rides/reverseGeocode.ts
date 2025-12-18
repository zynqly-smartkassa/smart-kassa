/**
 * Converts geographic coordinates into a human-readable address string.
 * 
 * This function performs reverse geocoding using the OpenStreetMap Nominatim API.
 * It takes latitude and longitude coordinates and returns the full address string
 * (display_name) for that location.
 * 
 * @param {number} lat - The latitude coordinate.
 * @param {number} lng - The longitude coordinate.
 * @returns {Promise<string | null>} A promise that resolves to the full address string or null if reverse geocoding fails.
 * @throws {Error} Logs errors to console but returns null instead of throwing.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    if (!data || !data.display_name) return null;
    return data.display_name;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return null;
  }
}