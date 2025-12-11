/**
 * Ride Overview endpoint
 * Handles ride overview
 * @author Markus Rossmann
 */

import express from "express";
import pool from "../db.js";

const router = express.Router();
/**
 * POST /all-rides
 * 
 *
 * @route POST /all-rides
 * @access Public
 * @body {integer} user_id
 * @returns {Object} 200 - Successful query
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 400 - User has no rides
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({
            status: "error",
            code: "MISSING_FIELDS",
            message: "Missing required fields"
        });
    }

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
            WHERE u.user_id = $1`,
            [user_id]
        )

        if (rides.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                code: "USER_HAS_NO_RIDES ",
                message: "User has no rides"
            });
        }

        res.status(200).json({
            status: "success",
            ride_count: rides.rowCount,
            rides: rides.rows
        });

    } catch (error) {
        return res.status(500).send({
            error: "Internal Server Error",
            details: error.message
        });
    }
});

/**
 * GET /all-rides
 * Health check endpoint for the all-rides route
 * @route GET /all-rides
 * @access Public
 */
router.get("/", (req, res) => {
    res.send("Server running on route /all-rides");
});

export default router;