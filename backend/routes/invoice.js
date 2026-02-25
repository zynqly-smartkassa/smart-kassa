import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import multer from "multer";
import pool from "../db.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import invoicePDFService from "../services/invoicePDF.service.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: false, // Railway nutzt virtual-hosted style
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

/**
 * amount_net,
   tax_rate,
   amount_tax,
   amount_gross,
   tip_amount,
   payment_method
 */

router.post(
  "/",
  authenticateToken,
  upload.single("newInvoice"),
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const companyId = req.user.companyId;
      const {
        ride_id,
        amount_net,
        tax_rate,
        amount_tax,
        amount_gross,
        payment_method,
      } = req.body;

      let tip_amount = req.body.tip_amount;

      if (!tip_amount) {
        tip_amount = 0;
      }

      // Check for missing/null/undefined fields
      if (
        companyId == null ||
        userId == null ||
        ride_id == null ||
        amount_net == null ||
        tax_rate == null ||
        amount_tax == null ||
        amount_gross == null ||
        !payment_method
      ) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      // Validate amounts for a real cash register
      if (amount_gross <= 0) {
        return res
          .status(400)
          .send({ message: "amount_gross must be greater than 0" });
      }

      if (amount_net < 0 || amount_tax < 0 || tip_amount < 0) {
        return res.status(400).send({ message: "Amounts cannot be negative" });
      }

      // Start database transaction - must commit or rollback before returning
      await pool.query("BEGIN");

      const checkDupe = await pool.query(
        "SELECT * FROM billing WHERE ride_id = $1",
        [ride_id],
      );
      if (checkDupe.rowCount > 0) {
        return res.status(409).send({ message: "Bill already exists" });
      }

      const billingQuery = await pool.query(
        `
            INSERT INTO billing 
                (
                    ride_id,
                    company_id,
                    amount_net,
                    tax_rate,
                    amount_tax,
                    amount_gross,
                    tip_amount,
                    payment_method
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING billing_id;
            `,
        [
          ride_id,
          companyId,
          amount_net,
          tax_rate,
          amount_tax,
          amount_gross,
          tip_amount,
          payment_method,
        ],
      );

      const billing_id = billingQuery.rows[0].billing_id;

      // Commit transaction before PDF generation so the data is visible
      await pool.query("COMMIT");

      const newInvoice = await invoicePDFService.generateInvoicePdf(billing_id);

      if (!newInvoice) {
        // Delete billing entry if PDF generation fails
        await pool.query("DELETE FROM billing WHERE billing_id = $1", [
          billing_id,
        ]);
        return res.status(400).send({
          error: "No File for the invoice provided",
          path: "invoices",
        });
      }

      // Timestamp for unique file names
      const timestamp = Date.now();
      const filename = `Bills/${companyId}/${userId}/${timestamp}_${billing_id}.pdf`;

      const putCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: newInvoice,
        ContentType: newInvoice.mimetype,
      });

      // Upload PDF to S3 - delete billing entry if upload fails
      try {
        await s3Client.send(putCommand);
      } catch (error) {
        console.error("S3 upload error:", error);
        await pool.query("DELETE FROM billing WHERE billing_id = $1", [
          billing_id,
        ]);
        return res
          .status(500)
          .send({ message: "Railway Bucket Error", error: error });
      }

      // Generate presigned URL for file access - continue without URL if this fails
      let url = null;
      try {
        url = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
          }),
          { expiresIn: 7 * 24 * 60 * 60 },
        );
      } catch (error) {
        console.error(
          "Error generating presigned URL (continuing without URL):",
          error,
        );
        // File is uploaded successfully, just no temporary URL available
      }

      const driverDataResult = await pool.query(
        `SELECT first_name, last_name, email, phone_number from users where user_id = $1`,
        [userId],
      );
      const driverData = driverDataResult.rows[0];

      const billingDataResult = await pool.query(
        `SELECT amount_net, tax_rate, amount_tax, amount_gross, tip_amount, payment_method FROM billing WHERE billing_id = $1`,
        [billing_id],
      );
      const billingData = billingDataResult.rows[0];

      return res.status(200).send({
        files: {
          driverData: {
            name: `${driverData.first_name} ${driverData.last_name}`,
            email: driverData.email,
            phonenumber: driverData.phone_number,
          },
          billingData: {
            billing_id: billing_id,
            amount_net: billingData.amount_net,
            tax_rate: billingData.tax_rate,
            amount_tax: billingData.amount_tax,
            amount_gross: billingData.amount_gross,
            tip_amount: billingData.tip_amount,
            payment_method: billingData.payment_method,
          },
          key: filename,
          url: url,
          size: newInvoice.size,
          lastModified: new Date(timestamp),
        },

        message: "Invoice uploaded successfully",
      });
    } catch (error) {
      // Try to rollback if we're still in a transaction
      try {
        await pool.query("ROLLBACK");
      } catch {
        // Transaction may have already been committed, ignore rollback errors
      }
      console.error("Creating new Invoice Error: \n", error);
      return res.status(500).send({
        message: "Error when appending new invoice and creating invoice pdf",
        error: error,
      });
    }
  },
);

export default router;
