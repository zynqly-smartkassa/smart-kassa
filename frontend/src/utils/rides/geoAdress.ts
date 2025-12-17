import {
  CapacitorHttp,
  type HttpOptions,
  type HttpResponse,
} from "@capacitor/core";

// Calls the link and converts the adress into lat and lng coordinates
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
