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
 * @body {integer} user_id (required, unique)
 * @body {string} start_address (required)
 * @body {string} start_time (required)
 * @body {float} start_lat (required)
 * @body {float} start_lng (required)
 * @body {string} end_address (required)
 * @body {string} end_time (required)
 * @body {float} end_lat (required)
 * @body {float} end_lng (required)
 * @body {float} end_km  (required) // FRONTED DOES NOT SEND THIS!!! POSTMAN CURRENTLY HANDLES THIS ERROR - AFTER FIX DELETE $14 IN QUERY
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
        end_km, // FRONTED DOES NOT SEND THIS!!! POSTMAN CURRENTLY HANDLES THIS ERROR - AFTER FIX DELETE $14 IN QUERY
        duration,
        distance,
        ride_type,
    } = req.body;

    try {
        // Begin of database transaction, if an operation fails, all queries roll back
        await pool.query("BEGIN");

        // Random vehicle id for test purposes, when vehicle_id gets implemented refactor the code!
        const vehicle_id = Math.floor(Math.random() * 100 + 1);

        const rideRes = await pool.query(
            `
            INSERT INTO ride
                (user_id, vehicle_id,
                start_address, start_time, start_lat, start_lng,
                end_address, end_time, end_lat, end_lng,
                duration, distance, ride_type, end_km)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING ride_id
            `,
            [
                user_id, vehicle_id,
                start_address, start_time, start_lat, start_lng,
                end_address, end_time, end_lat, end_lng,
                duration, distance, ride_type, end_km // FRONTED DOES NOT SEND THIS!!! POSTMAN CURRENTLY HANDLES THIS ERROR - AFTER FIX DELETE $14 IN QUERY
            ]
        );

        const ride_id = rideRes.rows[0].ride_id;

        res.json({
            message: "Ride Data",
            ride_info: {
                ride_id: ride_id,
                vehicle_id: vehicle_id,
            },
        });

        await pool.query("COMMIT");
    } catch (error) {
        await pool.query("ROLLBACK");
        const errorResponse = "\nDEBUG PRINT\n";
        console.error(errorResponse)
        return res.status(500).send({ error: errorResponse, message: "Internal Server Error" });

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
