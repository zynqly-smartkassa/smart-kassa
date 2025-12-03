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