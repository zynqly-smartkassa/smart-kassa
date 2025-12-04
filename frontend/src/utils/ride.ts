import axios from "axios";


export async function sendRide(
 ride: {
   user_id: number;
  start_address: string,
  start_time: string,
  start_lat: number,
  start_lng: number,
  end_address: string,
  end_time: string,
  end_lat: number,
  end_lng: number,
  duration: string,
  distance: number;
  ride_type: string,
  }
) {
  try {
    const { data } = await axios.post("http://localhost:3000/ride", ride, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return data;
  } catch(error) {
    console.error("Fehler beim Registrieren der Fahrt:", error);
    throw error;
  }
}