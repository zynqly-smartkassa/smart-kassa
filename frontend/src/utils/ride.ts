import axios, { AxiosError } from "axios";


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
    if (!data) {
      throw new Error("Response is empty");
    }
    return data;
  } catch (error) {
    console.error("Error while sending ride:", error);

    if (error instanceof AxiosError) {

      //500
      if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      }

      //400
      if (error.response?.status === 400) {
        throw new Error("Missing or invalid ride fields");
      }

      // Ride exists already
      if (error.response?.status === 409) {
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error("Ride already exists");
      }
    }

    // Fallback unknown
    throw new Error("Unknown Error while sending ride");
  }
}