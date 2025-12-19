import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { list, put } from "@vercel/blob";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

/**
 * To get the .pdf files of the bills
 * @returns {Object} response - the whole response Object containing Information and all files (Also the Bills Marker)
 * @returns {Array} actualFiles - the pdf. files that are the bills (without marker File/Object)
 * @author Casper Zielinski
 */
router.get("/invoices", authenticateToken, async (_, res) => {
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
    console.error("Error fetching Blob for Invoices: ", error);
    res.status(500).send({ error: "Internal Server Error", path: "invoices" });
  }
});

/**
 * @todo implement different pfp for each user
 */
router.get("/avatar", authenticateToken, async (req, res) => {
  try {
    //const userId = req.user.userId;

    const response = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: "Profile_Picture/",
    });

    const actualFiles = response.blobs.filter((blob) => blob.size > 0);
    //&& blob.pathname.split("/")[1].split(".")[0] === userId
    return res.status(200).send({
      response: response,
      actualFiles: actualFiles,
    });
  } catch (error) {
    console.error("Error fetching blob for Avatar: ", error);
    return res.status(500).send({ error: error });
  }
});

/**
 * @todo implement different pfp for each user
 */
router.put(
  "/avatar",
  authenticateToken,
  upload.single("newAvatar"),
  async (req, res) => {
    try {
      //const userId = req.user.userId;
      const newAvatar = req.file;

      if (!newAvatar) {
        return res
          .status(400)
          .send({ error: "Keine Datei im Request gefunden." });
      }

      // Get file extension from the uploaded file
      const fileExtension = newAvatar.originalname.split('.').pop().toLowerCase();
      const filename = `Profile_Picture/john_doe.${fileExtension}`;

      const response = await put(
        filename,
        newAvatar.buffer,
        {
          token: process.env.BLOB_READ_WRITE_TOKEN,
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: true
        }
      );

      return res.status(200).send({
        response: response,
        url: response.url,
      });
    } catch (error) {
      console.error("Error uploading avatar to blob:", error);
      return res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
  }
);

export default router;
