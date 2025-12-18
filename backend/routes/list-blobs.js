import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { list } from "@vercel/blob";

const router = express.Router();

/**
 * To get the .pdf files of the bills
 * @returns {Object} response - the whole response Object containing Information and all files (Also the Bills Marker)
 * @returns {Array} actualFiles - the pdf. files that are the bills (without marker File/Object)
 * @author Casper Zielinski
 */
router.get("/invoices", authenticateToken, async (req, res) => {
  try {
    const response = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: "Bills/",
    });

    const actualFiles = response.blobs.filter((blob) => blob.size > 0);

    res.status(200).send({
      response: response,
      actualFiles: actualFiles,
    });
  } catch (error) {
    console.error("Error fetching Blob");
    res.status(500).send({ error: "Internal Server Error", path: "invoices" });
  }
});

export default router;
