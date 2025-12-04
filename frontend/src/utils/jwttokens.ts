import axios, { AxiosError } from "axios";
import { AuthStorage } from "./secureStorage";

/**
 * Method to check if access token is valid or not
 * @returns User Data if access token is valid
 */
export async function verifyAccessToken() {
  try {
    const accessToken = await AuthStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      await AuthStorage.clearTokens();
      try {
        const newAccessToken = await refreshAccessToken();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        });

        return response.data;
      } catch {
        await AuthStorage.clearTokens();
        throw new Error("Session expired, please login again");
      }
    } else {
      throw new Error("Unknown Error");
    }
  }
}

/**
 * Refresh access token using refresh token from cookie
 */
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh`,
      {},
      { withCredentials: true }
    );

    const { accessToken } = await response.data;

    await AuthStorage.setTokens(accessToken);
    return accessToken;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      throw new Error("Refresh token invalid or expired");
    }
    throw new Error("Failed to refresh token");
  }
}
