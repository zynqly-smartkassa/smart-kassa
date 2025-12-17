import pool from "./db.js";

class FahrtenController {

  //   start neue fahrt
  async startFahrt({ userId, vehicleId, lat, lng }) {

      const startKm = 0; // Initial start kilometer

    const result = await pool.query(
      `INSERT INTO fahrten (user_id, vehicle_id, start_km, start_lat, start_lng, status)
       VALUES ($1, $2, $3, $4, $5, 'open')
       RETURNING *`,
      [userId, vehicleId, startKm, lat, lng]
    );

    return result.rows[0];
  }

    //end existiert fahrt
  async endFahrt({ fahrtId, endKm, lat, lng }) {
    const result = await pool.query(
      `UPDATE fahrten
       SET end_km   = $2,
           end_lat  = $3,
           end_lng  = $4,
           end_time = now(),
           status   = 'closed'
       WHERE fahrten_id = $1
       RETURNING *`,
      [fahrtId, endKm, lat, lng]
    );

    if (result.rows.length === 0) {
      throw new Error("Fahrt not found or already closed");
    }

    return result.rows[0];
  }
}

// instance of the controller to be used in routes
const fahrtenController = new FahrtenController();
export default fahrtenController;
