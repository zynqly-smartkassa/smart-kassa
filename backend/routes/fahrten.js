import express from "express";
import fahrtenController from "../fahrtenController.js";

const router = express.Router();

// POST /fahrten/start

router.post("/start", async (req, res) => {
  try {
    const { userId, vehicleId, startKm, lat, lng } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const fahrt = await fahrtenController.startFahrt({
      userId,
      vehicleId: vehicleId ?? null,
      lat: lat ?? null,
      lng: lng ?? null,
    });

    res.status(201).json(fahrt);
  } catch (err) {
    console.error("Error in POST /fahrten/start:", err);
    res.status(500).json({ error: "Failed to start Fahrt" });
  }
});

// POST /fahrten/:id/end

router.post("/:fahrten_id/end", async (req, res) => {
  try {
    const fahrtId = Number(req.params.fahrten_id);
    const { endKm, lat, lng } = req.body;

    if (!fahrtId) {
      return res.status(400).json({ error: "Invalid Fahrt ID" });
    }

    const fahrt = await fahrtenController.endFahrt({
      fahrtId,
      endKm: endKm ?? null,
      lat: lat ?? null,
      lng: lng ?? null,
    });

    res.json(fahrt);
  } catch (err) {
    console.error("Error in POST /fahrten/:fahrten_id/end:", err);
    res
      .status(400)
      .json({ error: err.message || "Failed to end Fahrt" });
  }
});

export default router;
