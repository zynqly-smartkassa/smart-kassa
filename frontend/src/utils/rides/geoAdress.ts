import {
  CapacitorHttp,
  type HttpOptions,
  type HttpResponse,
} from "@capacitor/core";

/**
 * Converts a human-readable address string into geographic coordinates (latitude, longitude).
 * 
 * This function uses the OpenStreetMap Nominatim API to geocode addresses. It includes
 * a custom User-Agent header as required by Nominatim's usage policy. The function is
 * compatible with both mobile (via CapacitorHttp) and web platforms.
 * 
 * @param {string} address - The address to geocode (e.g., "Mariahilfer Straße 120, Wien").
 * @returns {Promise<[number, number] | null>} A promise that resolves to coordinates as [latitude, longitude] or null if geocoding fails.
 * @throws {Error} Logs errors to console but returns null instead of throwing.
 */
export async function geocodeAddress(
  address: string
): Promise<[number, number] | null> {
  try {
    const options: HttpOptions = {
      url: `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      headers: {
        "User-Agent": "Zynqly/1.0 (casper.zielinski@edu.fh-joanneum.at)",
      },
    };

    // const response = await fetch(
    //   `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    //     address
    //   )}`,
    //   {
    //     headers: {
    //       "User-Agent": "Zynqly/1.0 (casper.zielinski@edu.fh-joanneum.at)",
    //     },
    //   }
    // );
    // const data = await response.json();

    const response: HttpResponse = await CapacitorHttp.get(options);
    const data = response.data;

    if (data.length === 0) return null;
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
}
