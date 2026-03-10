/**
 * JWT token utilities for authentication
 * Handles generation and verification of access and refresh tokens
 * @author Casper Zielinski
 */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a short-lived access token for API authentication
 * @param {Object} payload - User information to encode in the token
 * @param {string} payload.userId - The user's unique identifier
 * @param {string} payload.email - The user's email address
 * @param {string} payload.name - The user's full name
 * @param {string} payload.companyId - The user's company identifier
 * @returns {string} Signed JWT access token (expires in 15 minutes)
 * @example
 * const token = generateAccessToken({
 *   userId: 123,
 *   email: "user@example.com",
 *   name: "John Doe",
 *   companyId: 456,
 * });
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

/**
 * Generates a long-lived refresh token for obtaining new access tokens
 * @param {Object} payload - Minimal user information to encode
 * @param {string} payload.userId - The user's unique identifier
 * @returns {string} Signed JWT refresh token (expires in 1 day)
 * @example
 * const refreshToken = generateRefreshToken({ userId: 123 });
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d", 
  });
}

/**
 * Verifies and decodes an access token
 * @param {string} token - The JWT access token to verify
 * @returns {Object|null} Decoded token payload if valid, null if invalid or expired
 * @example
 * const decoded = verifyAccessToken(token);
 * if (decoded) {
 *   console.log(decoded.userId); // Access user ID from token
 * }
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Verifies and decodes a refresh token
 * @param {string} token - The JWT refresh token to verify
 * @returns {Object|null} Decoded token payload if valid, null if invalid or expired
 * @example
 * const decoded = verifyRefreshToken(token);
 * if (decoded) {
 *   // Token is valid, generate new access token
 * }
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}
