import express from "express";
import pool from "../db.js";
import argon2 from "argon2";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * DELETE /account
 * Deletes the authenticated user's account
 * Requires password confirmation for safety
 * uses both tokens
 */
router.delete("/", authenticateToken, async (req, res) => {
  const { isMobile, password } = req.body;
  // to check if the User is on the Mobile App, the refresh token is either in the cookies or in the request body
  let refreshToken = "";
  if (isMobile) {
    refreshToken = req.body.refreshToken;
  } else {
    refreshToken = req.cookies.refreshToken;
  }
  const user_id = req.user.userId;

  // to check which value is missing
  if (!refreshToken || !user_id) {
    let missingFieldsMessage = "Refresh Token or User ID are not provided"; // a let variable to dynamically change the message depending on what's missing
    if (!user_id && refreshToken) {
      missingFieldsMessage = "User ID is not provided";
    } else if (user_id && !refreshToken) {
      missingFieldsMessage = "Refresh Token is not provided";
    }

    console.error(
      "Delete Account Error: Fields Missing \n",
      missingFieldsMessage
    );

    return res.status(400).send({
      error: "Fields missing",
      message: missingFieldsMessage,
    });
  }

  try {
    // user has to provide his password to delete his account
    const dbpassword = await pool.query(
      "SELECT password_hash FROM users where user_id = $1",
      [user_id]
    );

    if (dbpassword.rowCount === 0) {
      console.error("Delete Account Error: User not found");
      return res
        .status(400)
        .json({ error: "User not found", path: "/deleteacount, line: 43" });
    }

    const validPassword = await argon2.verify(
      dbpassword.rows[0].password_hash,
      password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Invalid password", path: "/delete/acount" });
    }

    const result = await pool.query(`DELETE FROM users WHERE user_id = $1`, [
      user_id,
    ]);

    if (result.rowCount === 0) {
      console.error("Delete Account Error: User not found");
      return res
        .status(400)
        .json({ error: "User not found", path: "/delete/acount, line: 54" });
    }

    if (!isMobile) {
      res.clearCookie("refreshToken", {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      });
    }

    return res.status(200).send({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error: ", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
