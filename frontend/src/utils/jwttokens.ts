import axios, { AxiosError } from "axios";
import { AuthStorage } from "./secureStorage";
import { isMobile } from "@/hooks/use-mobile";

/**
 * Method to check if access token is valid or not
 * @returns User Data if access token is valid
 */
export async function verifyAccessToken() {
  try {
    const accessToken = await AuthStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("No Access Token");
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    if (!response || !response.data) {
      throw new Error("Empty Response");
    }

    return response.data;
  } catch (error) {
    console.error("Verify access token error:", error);

    // For ANY other error (network, timeout, 401, 403, 500, etc.),
    // always try to refresh the access token
    await AuthStorage.clearAccessToken();

    try {
      const newAccessToken = await refreshAccessToken();

      // Retry verification with the new access token
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/verify`,
        {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (refreshError) {
      // If refresh fails, clear all tokens and re-throw the specific error
      await AuthStorage.clearTokens();
      console.error("Token refresh failed:", refreshError);

      // Re-throw the specific error from refresh for better error messages
      throw refreshError;
    }
  }
}

/**
 * Refresh access token using refresh token from cookie
 */
async function refreshAccessToken() {
  try {
    const refreshToken = await AuthStorage.getRefreshToken();
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh`,
      {
        refreshToken: isMobile ? refreshToken : undefined,
      },
      { withCredentials: true }
    );

    if (!response || !response.data) {
      throw new Error("Empty Response");
    }

    const { accessToken } = await response.data;

    await AuthStorage.setTokens(accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      // Network errors (no response from server)
      if (error.code === "ERR_NETWORK" || !error.response) {
        throw new Error("Network Error");
      }

      // Timeout errors
      if (error.code === "ECONNABORTED" || error.code === "ERR_CANCELED") {
        throw new Error("Timeout");
      }
    }
  }
}
