/**
 * Authentication middleware
 * Provides token verification for protected routes
 * @author Casper Zielinski
 */

import { verifyAccessToken } from "../utils/jwt.js";

/**
 * Middleware to verify JWT access tokens
 * Extracts the token from Authorization header and validates it.
 * On success, attaches decoded user data to req.user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void | Response} Calls next() if valid, returns error response if invalid
 * @example
 * // Protect a route
 * router.get("/profile", authenticateToken, (req, res) => {
 *   console.log(req.user.userId); // User ID from token
 *   console.log(req.user.email);  // User email from token
 * });
 */
export function authenticateToken(req, res, next) {
  try {
    // Extract Authorization header (format: "Bearer <token>")
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Acces token required", path: "auth middleware" });
    }

    // Verify token signature and expiration
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(403).json({
        error: "Invalid or expired access token",
        path: "auth middleware",
      });
    }

    // Attach user data to request object for use in route handlers
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error: ", error);
    return res
      .status(500)
      .json({ error: "Authentication failed", path: "auth middleware" });
  }
}
