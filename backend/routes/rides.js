/**
 * Ride endpoint
 * Handles ride workflow
 * @author Markus Rossmann
 */

import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /ride
 * Inserts a new ride into the database and returns the created ride_id and vehicle_id.
 *
 * @route POST /ride
 * @access Public
 * @body {integer} user_id (required)
 * @body {string} start_address (required)
 * @body {string} start_time (required)
 * @body {float} start_lat (required)
 * @body {float} start_lng (required)
 * @body {string} end_address (required)
 * @body {string} end_time (required)
 * @body {float} end_lat (required)
 * @body {float} end_lng (required)
 * @body {string} duration (required)
 * @body {float} distance (required)
 * @body {string} ride_type (required)
 * @body {jsonb string} whole_ride (required)
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
  const {
    user_id,
    start_address,
    start_time,
    start_lat,
    start_lng,
    end_address,
    end_time,
    end_lat,
    end_lng,
    duration,
    distance,
    ride_type,
    whole_ride,
  } = req.body;

  if (
    !user_id ||
    !start_address ||
    !start_time ||
    !start_lat ||
    !start_lng ||
    !end_address ||
    !end_time ||
    !end_lat ||
    !end_lng ||
    !duration ||
    distance === null || // if in testing environment fake movement is deactivated, returns true
    !ride_type ||
    !whole_ride
  ) {
    return res.status(400).json({
      status: "error",
      code: "MISSING_FIELDS",
      message: "Missing required fields",
      received: {
        user_id: user_id,
        start_address: start_address,
        start_time: start_time,
        start_lat: start_lat,
        start_lng: start_lng,
        end_address: end_address,
        end_time: end_time,
        end_lat: end_lat,
        end_lng: end_lng,
        duration: duration,
        distance: distance,
        ride_type: ride_type,
        whole_ride: whole_ride,
      },
    });
  }

  try {
    // Begin of database transaction, if an operation fails, all queries roll back
    await pool.query("BEGIN");

    const userRes = await pool.query(
      `
            SELECT company_id FROM users WHERE user_id = $1
            `,
      [user_id],
    );

    if (userRes.rows.length === 0) {
      throw new Error(`User with ID ${user_id} not found`);
    }

    const company_id = userRes.rows[0].company_id;

    if (!company_id) {
      throw new Error(
        `User with ID ${user_id} is not assigned to a company. Billing cannot be created.`,
      );
    }

    // Random vehicle id for test purposes, when vehicle_id gets implemented refactor the code!
    const vehicle_id = Math.floor(Math.random() * 100 + 1);

    const rideRes = await pool.query(
      `
            INSERT INTO ride
                (user_id, vehicle_id,
                start_address, start_time, start_lat, start_lng,
                end_address, end_time, end_lat, end_lng,
                duration, distance, ride_type, whole_ride)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING ride_id
            `,
      [
        user_id,
        vehicle_id,
        start_address,
        start_time,
        start_lat,
        start_lng,
        end_address,
        end_time,
        end_lat,
        end_lng,
        duration,
        distance,
        ride_type,
        JSON.stringify(whole_ride),
      ],
    );

    if (!rideRes.rows || rideRes.rows.length === 0) {
      return res.status(500).json({
        status: "error",
        message: "Ride could not be created",
      });
    }

    const ride_id = rideRes.rows[0].ride_id;

    await pool.query("COMMIT");

    res.json({
      status: "success",
      message: "Ride and invoice successfully saved",
      ride_info: {
        ride_id: ride_id,
        vehicle_id: vehicle_id,
      },
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    return res.status(500).send({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

/**
 * GET /rides
 * Returns all rides for the authenticated user.
 *
 * @route GET /rides
 * @access Private
 * @returns {Object} 200 - Successful query with ride list
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Internal server error
 */
router.get("/", authenticateToken, async (req, res) => {
  const user_id = req.user.userId;
  const cursor = parseInt(req.query.cursor ?? 0);
  const limit = parseInt(req.query.limit ?? 12);

  try {
    const rides = await pool.query(
      `SELECT
        r.ride_id, r.vehicle_id,
        r.start_address, r.end_address,
        r.distance, r.duration,
        r.start_time, r.end_time,
        r.ride_type, u.user_id, r.whole_ride
      FROM ride r
      JOIN users u ON r.user_id = u.user_id
      WHERE u.user_id = $1 AND ride_id > $2 LIMIT $3`,
      [user_id, cursor, limit + 1],
    );

    const hasMore = rides.rowCount > limit;
    let next_cursor = null;

    if (hasMore) {
      rides.rows.pop();
      next_cursor = rides.rows.at(-1).ride_id;
    }

    res.status(200).json({
      status: "success",
      rides: rides.rows,
      next_cursor: next_cursor,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const rideId = req.params.id;

  try {
    const ride = await pool.query(
      `SELECT
        r.ride_id, r.vehicle_id,
        r.start_address, r.end_address,
        r.distance, r.duration,
        r.start_time, r.end_time,
        r.ride_type, u.user_id, r.whole_ride
      FROM ride r
      JOIN users u ON r.user_id = u.user_id
      WHERE u.user_id = $1 AND r.ride_id = $2`,
      [userId, rideId],
    );

    return res.status(200).json({ status: "success", ride: ride.rows[0] });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

export default router;
