/**
 * Ride endpoint
 * Handles ride workflow
 * @author Markus Rossmann
 */

import express from "express";
import pool from "../db.js";

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
        wholeRide
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
        !distance ||
        !ride_type ||
        !wholeRide
    ) {
        return res.status(400).json({
            status: "error",
            code: "MISSING_FIELDS",
            message: "Missing required fields"
        });
    }


    try {
        // Begin of database transaction, if an operation fails, all queries roll back
        await pool.query("BEGIN");

        // Random vehicle id for test purposes, when vehicle_id gets implemented refactor the code!
        const vehicle_id = Math.floor(Math.random() * 100 + 1);
        console.log(vehicle_id)
        const rideRes = await pool.query(
            `
            INSERT INTO ride
                (user_id, vehicle_id,
                start_address, start_time, start_lat, start_lng,
                end_address, end_time, end_lat, end_lng,
                duration, distance, ride_type, wholeRide)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING ride_id
            `,
            [
                user_id, vehicle_id,
                start_address, start_time, start_lat, start_lng,
                end_address, end_time, end_lat, end_lng,
                duration, distance, ride_type, JSON.stringify(wholeRide)
            ]
        );
        console.log(vehicle_id);
        console.log(wholeRide);
        const ride_id = rideRes.rows[0].ride_id;

        res.json({
            message: "Ride successfully saved",
            ride_info: {
                ride_id: ride_id,
                vehicle_id: vehicle_id,
            },
        });

        await pool.query("COMMIT");
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("DATABASE ERROR:", error);
        console.error("Details:", error.message);
        return res.status(500).send({
            error: "Internal Server Error",
        details: error.message
        });
    }
});

/**
 * GET /ride
 * Health check endpoint for the ride route
 * @route GET /ride
 * @access Public
 */
router.get("/", (req, res) => {
    res.send("Server running on route /ride");
});

export default router;
