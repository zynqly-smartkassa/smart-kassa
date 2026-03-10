import axios, { AxiosError } from "axios";

/**
 * Sends a completed ride to the backend API for storage.
 * 
 * This function posts all ride data including start/end locations, timestamps, duration,
 * distance, ride type, and the complete GPS path to the backend. It includes comprehensive
 * error handling for various HTTP status codes and validates the response.
 * 
 * @param {Object} ride - The ride object containing all ride details.
 * @param {number} ride.user_id - The ID of the user who completed the ride.
 * @param {string} ride.start_address - The starting address of the ride.
 * @param {string} ride.start_time - Timestamp when the ride started.
 * @param {number} ride.start_lat - Starting latitude coordinate.
 * @param {number} ride.start_lng - Starting longitude coordinate.
 * @param {string} ride.end_address - The ending address of the ride.
 * @param {string} ride.end_time - Timestamp when the ride ended.
 * @param {number} ride.end_lat - Ending latitude coordinate.
 * @param {number} ride.end_lng - Ending longitude coordinate.
 * @param {string} ride.duration - Total ride duration in HH:MM:SS format.
 * @param {number} ride.distance - Total distance traveled in meters.
 * @param {string} ride.ride_type - Type of ride (botenfahrt or taxifahrt).
 * @param {[number, number][]} ride.whole_ride - Array of all GPS coordinates recorded during the ride.
 * @returns {Promise<any>} A promise that resolves to the API response data including the ride ID.
 * @throws {Error} Throws specific errors for 400 (invalid fields), 409 (conflict), 500 (server error), or unknown errors.
 */
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
