import axios, { AxiosError } from "axios";
import { AuthStorage } from "./localStorageTokens";
import { getOrCreateDeviceId } from "./deviceId";

/**
 * Method to check if access token is valid or not
 * @returns User Data if access token is valid
 */
export async function verifyAccessToken() {
  try {
    const accessToken = AuthStorage.getAccessToken();

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      AuthStorage.clearToken();
      try {
        const newAccessToken = await refreshAccessToken();

        const response = axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return (await response).data;
      } catch {
        AuthStorage.clearToken();
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
      { device_id: getOrCreateDeviceId() },
      { withCredentials: true }
    );

    const { accessToken } = await response.data;

    AuthStorage.setTokens(accessToken);
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
