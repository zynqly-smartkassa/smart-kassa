import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const user_id = req.user.userId;
  const device_id = req.body.device_id;

  if (!refreshToken || !user_id) {
    let missingFieldsMessage = "Refresh Token or User ID are not provided";
    if (!user_id && refreshToken) {
      missingFieldsMessage = "User ID is not provided";
    } else if (user_id && !refreshToken) {
      missingFieldsMessage = "Refresh Token is not provided";
    }

    console.error("Logout Error: Fields Missing \n", missingFieldsMessage);

    return res.status(400).send({
      error: "Fields missing",
      message: missingFieldsMessage,
    });
  }

  if (!device_id) {
    return res.status(400).send({
      error: "Device ID missing",
      message:
        "Missing the unique device id each device has in it's local storage",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE session SET is_revoked = true, expires_at = '1970-01-01 00:00:00' WHERE refresh_token = $1 AND user_id = $2 AND device_id = $3`,
      [refreshToken, user_id, device_id],
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        error: "No Session found",
        message:
          "No Session found to log out user, check if the provided values are correct",
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return res.status(200).send({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error: ", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
