/**
 * SmartKasse Backend Application
 * Main entry point for the Express API server
 *
 * This file configures the Express application with middleware,
 * routes, and error handling for the SmartKasse point-of-sale system
 *
 * @example
 * // Adding a new API endpoint
 * import newRoutes from "./routes/new.js";
 * app.use("/new", newRoutes);
 *
 * @author Casper Zielinski
 * @author Mario Shenouda
 */

// Load environment variables from .env file
dotenv.config();

const app = express();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// API-Routes
import refreshRoutes from "./routes/refresh.js";
import registerRoutes from "./routes/register.js";
import loginRoutes from "./routes/login.js";
import verifyRoutes from "./routes/verify.js";
import fahrtRoutes from "./routes/fahrten.js";
import rideRoutes from "./routes/ride.js";
import allridesRoutes from "./routes/all-rides.js";
import logOutRoutes from "./routes/logout.js";
import deleteAccountRoutes from "./routes/deleteAccount.js";
import listBlobsRoutes from "./routes/list-blobs.js";
import updateProfileRoutes from "./routes/updateProfile.js";

/**
 * Middleware Configuration
 * Applied in order to all incoming requests
 */

// CORS - Allow frontend to make requests with credentials
app.use(
  cors({
    origin: [
      "https://smart-kassa.vercel.app",
      "http://localhost", // Capacitor Android/iOS
      "https://localhost",
      "http://localhost:5173",
      "capacitor://localhost",
      "http://localhost:5173",
      process.env.DEBUG_URL, // to test/debug
    ],
    credentials: true, // Allow cookies to be sent
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Helmet - Set security-related HTTP headers
app.use(helmet());

// Cookie Parser - Parse cookies from request headers
app.use(cookieParser());

/**
 * API Routes
 * All routes are prefixed with their endpoint path
 */
app.use("/refresh", refreshRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/verify", verifyRoutes);
app.use("/fahrten", fahrtRoutes);
app.use("/ride", rideRoutes);
app.use("/all-rides", allridesRoutes);
app.use("/logout", logOutRoutes);
app.use("/account", deleteAccountRoutes);
app.use("/account", updateProfileRoutes);
app.use("/list-blobs", listBlobsRoutes);

/**
 * Health Check Endpoint
 * Used to verify the server is running
 * @route GET /
 * @access Public
 */
app.get("/", (_, res) => {
  res.send("SmartKassa API - Server running");
});

/**
 * 404 Handler
 * Catches all unmatched routes and returns a 404 error
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// LOCAL Server Configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SmartKassa API running on port ${PORT}`);
});
