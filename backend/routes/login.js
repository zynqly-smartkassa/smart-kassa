/**
 * User login endpoint
 * Handles user authentication and JWT token generation
 * @author Markus Rossman
 * @author Casper Zielinski
 */

import express from "express";
import argon2 from "argon2";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * POST /login
 * Authenticates a user and issues JWT tokens
 *
 * Verifies user credentials against the database, validates password hash,
 * and generates both access and refresh tokens on successful authentication
 *
 * @route POST /login
 * @access Public
 * @body {string} email - User's email (required)
 * @body {string} password - User's password (required)
 * @returns {Object} 200 - Login successful with access token and user info
 * @returns {Object} 400 - User not found
 * @returns {Object} 401 - Invalid password
 * @returns {Object} 500 - Internal server error
 */

router.post("/", async (req, res) => {
  const { email, password, isMobile } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    // Query database for user by email
    const result = await pool.query(
      `SELECT 
        users.user_id,
        users.password_hash,
        users.email,
        users.first_name,
        users.last_name
      FROM users
      WHERE users.email = $1`,
      [email]
    );

    // Check if user exists
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Verify password against stored Argon2 hash
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Prepare payload for access token (includes user info for API requests)
    const payload = {
      userId: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    };

    // Generate both access and refresh tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ userId: user.user_id });

    // Calculate refresh token expiration (30 days from now)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Update session record with new refresh token and expiration
    await pool.query(
      `UPDATE session SET expires_at = $1, refresh_token = $2 WHERE user_id = $3`,
      [expiresAt, refreshToken, user.user_id]
    );

    // if user is not on the Mobile App, refreshtoken is being sent via httpOnly cookie
    if (!isMobile) {
      // Store refresh token in httpOnly cookie (not accessible via JavaScript)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      });
    }

    // Return access token and user info to client
    res.json({
      message: "Login successful",
      accessToken,
      refreshToken: isMobile ? refreshToken : undefined, //  on Mobile the the refres token is in the response body, because httpOnly Cookies do not work on Mobile Apps
      user: {
        userId: user.user_id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /login
 * Health check endpoint for the login route
 * @route GET /login
 * @access Public
 */
router.get("/", (_, res) => {
  res.send("Server running on route /login");
});

export default router;
