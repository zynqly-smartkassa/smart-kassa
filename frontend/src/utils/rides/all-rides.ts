import axios, { AxiosError } from "axios";

export async function getAllRides(
  user_id: number
) {
  try {
    const { data } = await axios.post("http://localhost:3000/all-rides", {user_id}, {
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
