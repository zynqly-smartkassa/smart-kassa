/**
 * Ride Overview endpoint
 * Handles ride overview
 * @author Markus Rossmann
 */

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { user_id } = req.body;

    try {
        const rides = await pool.query(
            `SELECT
                r.start_address, r.end_address,
                r.distance, r.duration, 
                r.start_time, r.end_time, 
                r.ride_type, u.user_id 
            FROM ride r 
            JOIN users u ON r.user_id = u.user_id 
            WHERE u.user_id = $1`,
            [user_id]
        )

        res.status(200).json({
            success: true,
            count: rides.rowCount,
            rides: rides.rows
        });

    } catch (error) {
        const errorResponse = "Error caught";
        console.error(errorResponse);
        return res.status(500).send({ error: errorResponse, message: "Internal Server Error" });

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