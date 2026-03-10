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
  const device_id = req.body.device_id;

  if (!refreshToken) {
    if (!req.body.refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }
    refreshToken = req.body.refreshToken;
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
       WHERE refresh_token = $1 AND user_id = $2 AND expires_at > NOW() AND device_id = $3 AND is_revoked = false`,
      [refreshToken, decoded.userId, device_id]
    );

    if (tokenRes.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Refresh token expired or revoked" });
    }

    // Fetch current user information for the new access token
    const userRes = await pool.query(
      `SELECT user_id, first_name, last_name, email, company_id FROM users
       WHERE user_id = $1 AND is_deleted = FALSE`,
      [decoded.userId]
    );

    if (userRes.rowCount === 0) {
      return res
        .status(404)
        .send({
          error: "No User found",
          message: "Either User does not exist anymore or User was deleted",
        });
    }

    const user = userRes.rows[0];

    // Generate new access token with current user data
    const newAccessToken = generateAccessToken({
      userId: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      companyId: user.company_id,
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
