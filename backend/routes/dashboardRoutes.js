import express from "express";
import { weekly, daily, monthly } from "../dashboardController.js";

const router = express.Router();

router.get("/rides/weekly", weekly);
router.get("/rides/daily", daily);
router.get("/rides/monthly", monthly);

export default router;
