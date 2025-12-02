/**
 * Token refresh endpoint
 * Handles the generation of new access tokens using valid refresh tokens
 * @author Casper Zielinski
 */

import express from "express";
import pool from "../db.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * POST /refresh
 * Generates a new access token from a valid refresh token
 *
 * The refresh token is read from httpOnly cookies for security
 * Validates the token against both JWT signature and database records
 *
 * @route POST /refresh
 * @access Public (but requires valid refresh token in cookies)
 * @returns {Object} 200 - New access token
 * @returns {Object} 401 - Refresh token not provided
 * @returns {Object} 403 - Invalid, expired, or revoked token
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
  // Extract refresh token from httpOnly cookie
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    // Verify token signature and decode payload
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Verify token exists in database and hasn't expired or been revoked
    const tokenRes = await pool.query(
      `SELECT * FROM session
       WHERE refresh_token = $1 AND user_id = $2 AND expires_at > NOW()`,
      [refreshToken, decoded.userId]
    );

    if (tokenRes.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Refresh token expired or revoked" });
    }

    // Fetch current user information for the new access token
    const userRes = await pool.query(
      `SELECT user_id, first_name, last_name, email FROM users
       WHERE user_id = $1`,
      [decoded.userId]
    );

    const user = userRes.rows[0];

    // Generate new access token with current user data
    const newAccessToken = generateAccessToken({
      userId: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    });

    // Return new access token to client
    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error("Error in /refresh:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
