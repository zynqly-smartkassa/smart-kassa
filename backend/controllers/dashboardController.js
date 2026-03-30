import { getWeeklyRides, getDailyRides, getMonthlyRides } from "../models/dashboardModel.js";

export async function weekly(req, res) {
  try {
    const data = await getWeeklyRides();
    res.json(data);
  } catch (error) {
    console.error("Error in weekly stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

export async function daily(req, res) {
  try {
    const data = await getDailyRides();
    res.json(data);
  } catch (error) {
    console.error("Error in daily stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

export async function monthly(req, res) {
  try {
    const data = await getMonthlyRides();
    res.json(data);
  } catch (error) {
    console.error("Error in monthly stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
