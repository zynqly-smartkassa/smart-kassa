import axios from "axios";
import { AuthStorage } from "./secureStorage";

/**
 * Fetches the weekly ride statistics.
 * Grouped by day of the week ('Mon', 'Tue', etc.)
 */
export async function getWeeklyStats() {
  const token = await AuthStorage.getAccessToken();
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/rides/weekly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Fetches the daily ride statistics (last 24 hours).
 * Grouped by 3-hour blocks ('00:00', '03:00', ...).
 */
export async function getDailyStats() {
  const token = await AuthStorage.getAccessToken();
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/rides/daily`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Fetches the monthly ride statistics.
 * Grouped by weeks ('Week 1', 'Week 2', ...).
 */
export async function getMonthlyStats() {
  const token = await AuthStorage.getAccessToken();
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/rides/monthly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
