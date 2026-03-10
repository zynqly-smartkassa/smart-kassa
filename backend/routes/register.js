/**
 * User registration endpoint
 * Handles new user registration with JWT authentication
 * @author Mario Shenouda
 * @author Casper Zielinski
 */

import express from "express";
import argon2 from "argon2";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * POST /register
 * Creates a new user account and issues authentication tokens
 *
 * Creates user record, hashes password with Argon2, generates JWT tokens,
 * and stores refresh token in database and httpOnly cookie
 *
 * @route POST /register
 * @access Public
 * @body {string} first_name - User's first name (required)
 * @body {string} last_name - User's last name (required)
 * @body {string} email - User's email address (required, unique)
 * @body {string} phone_number - User's phone number (required, unique)
 * @body {string} password - User's password (required, will be hashed)
 * @body {string} fn - User's fn number (required)
 * @body {string} atu - User's atu number (required)
 * @returns {Object} 201 - User created with access token and user info
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 409 - User with this email already exists
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    fn,
    atu,
    device_id,
    user_agent,
    device_name,
  } = req.body;

  try {
    // validate input (if missing fields or something is wrong)
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !password ||
      !fn ||
      !atu
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    if (!device_id || !user_agent || !device_name) {
      return res.status(400).send({
        error:
          "Missing fields required for multi-device user authentication and user info",
      });
    }

    const client_ip = req.socket.address();

    // Check for duplicate email
    const checkuser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkuser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Hash password using Argon2 (secure password hashing)
    const hashedPassword = await argon2.hash(password);

    // tokens and values for payload, response etc. values initialized in try catch that are needed else where
    let accessToken;
    let refreshToken;
    let userId;

    try {
      // Begin of database transaction, if an operation fails, all queries roll back
      await pool.query("BEGIN");

      // Insert company into company table and return the generated company_id

      // DUMMY DATA FOR COMPANY RECORD IN DATABASE
      const companyRes = await pool.query(
        `
        INSERT INTO company 
        (
        fn,
        atu,
        company_name,
        street,
        postal_code,
        city,
        country
        )
        VALUES
        (
        $1,
        $2,
        'Taxi Drive GmbH',
        'Rechbauerstraße 67',
        '8010',
        'Graz',
        'Österreich'
        )
        RETURNING company_id`,
        [fn, atu]
      );

      const companyId = await companyRes.rows[0].company_id;

      // Insert user into users table and return the generated user_id
      const userRes = await pool.query(
        `INSERT INTO users (company_id, first_name, last_name, email, phone_number, password_hash, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING user_id`,
        [companyId, first_name, last_name, email, phone_number, hashedPassword]
      );

      const userId = await userRes.rows[0].user_id;

      // Prepare payload for access token (includes user info for API requests)
      const payload = {
        userId: userId,
        email: email,
        name: `${first_name} ${last_name}`,
        companyId: companyId
      };

      // Generate both access and refresh tokens
      accessToken = generateAccessToken(payload);
      refreshToken = generateRefreshToken({ userId: userId });

      // Insert account record with hashed password and refresh token
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

      /**
       * inserting data into the session table that is being used to store the refresh token, it's experation date, and also to ensure
       * user's can be loged into their accounts on many devices (each device stores a device_id in it's local storage, to differentiate between devices the user uses )
       */
      await pool.query(
        `INSERT INTO session (user_id, refresh_token, created_at, expires_at, user_agent, client_ip, device_name, device_id, is_revoked)
       VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, FALSE)`,
        [
          userId,
          refreshToken,
          expiresAt,
          user_agent,
          client_ip,
          device_name,
          device_id,
        ]
      );

      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      const errorResponse = error;
      console.error(errorResponse);
      if (
        /^Key \(phone_number\)=\(\+?\d+\s?\d+\) already exists\.$/.test(
          error.detail
        )
      ) {
        return res.status(409).send({
          error: `Ein Account mit der Telefonnumer '${phone_number}' existiert bereits.`,
        });
      }

      if (/Key \(fn\)=\(([^)]+)\)/.test(error.detail)) {
        return res.status(409).send({
          error: `Ein Account mit der FN '${fn}' existiert bereits.`,
        });
      }

      if (/^Key \(atu\)=\(ATU\d+\) already exists\.$/.test(error.detail)) {
        return res.status(409).send({
          error: `Ein Account mit der ATU-Nummer '${atu}' existiert bereits.`,
        });
      }

      return res
        .status(500)
        .send({ error: errorResponse, message: "Internal Server Error" });
    }

    // Store refresh token in httpOnly cookie (not accessible via JavaScript)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/",
    });

    // Return access token and user info to client
    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: userId,
        name: `${first_name} ${last_name}`,
        email: email,
      },
    });
  } catch (err) {
    console.error("Error in /register: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /register
 * Health check endpoint for the register route
 * @route GET /register
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Server running on route /register");
});

export default router;
