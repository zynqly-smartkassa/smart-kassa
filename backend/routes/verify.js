/**
 * Api Endpoint used to verify the accessToken
 * @author Casper Zielinski
 */
import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import pool from "../db.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userRes = await pool.query(
      `SELECT user_id, first_name, last_name, email, phone_number 
      FROM users WHERE user_id = $1`,
      [req.user.userId]
    );

    const user = userRes.rows[0];

    return res.status(200).send({
      id: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
    });
  } catch (err) {
    console.error("Error in /verify: ", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
