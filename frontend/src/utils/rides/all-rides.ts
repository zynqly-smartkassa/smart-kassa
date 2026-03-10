import axios, { AxiosError } from "axios";

/**
 * Fetches all rides for a specific user from the backend API.
 * 
 * This function makes a POST request to the `/all-rides` endpoint with the user ID
 * and returns all ride records associated with that user. It includes comprehensive
 * error handling for various HTTP status codes.
 * 
 * @param {number} user_id - The ID of the user whose rides should be retrieved.
 * @returns {Promise<any>} A promise that resolves to the ride data object containing all user rides.
 * @throws {Error} Throws specific errors for 400 (invalid fields), 409 (conflict), 500 (server error), or unknown errors.
 */
export async function getAllRides(
  user_id: number
) {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/all-rides`, {user_id}, {
      headers:  {
        "Content-Type": "application/json"
      },
    });
    if (!data) {
      throw new Error("Res is empty")
    }
    return data;
  }catch (err) {
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
