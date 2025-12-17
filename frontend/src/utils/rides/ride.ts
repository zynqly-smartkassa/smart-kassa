import axios, { AxiosError } from "axios";

export async function sendRide(ride: {
  user_id: number;
  start_address: string;
  start_time: string;
  start_lat: number;
  start_lng: number;
  end_address: string;
  end_time: string;
  end_lat: number;
  end_lng: number;
  duration: string;
  distance: number;
  ride_type: string;
  whole_ride: [number, number][];
}) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/ride`,
      ride,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data) {
      throw new Error("Response is empty");
    }
    return data;
  } catch (err) {
    console.error("Error while sending ride:", err);

    if (err instanceof AxiosError) {

      console.error(err.response?.data)

      //500
      if (err.response?.status === 500) {
        throw new Error("Internal Server Error");
      }

      //400
      if (err.response?.status === 400) {
        throw new Error("Missing or invalid ride fields");
      }

      // Ride exists already
      if (err.response?.status === 409) {
        if (err.response?.data?.error) {
          throw new Error(err.response.data.error);
        }
        throw new Error("Ride already exists");
      }
    }

    // Fallback unknown
    throw new Error("Unknown Error while sending ride");
  }
}
