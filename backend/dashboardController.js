import pool from "./db.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"];
const WEEKS = ["Week 1","Week 2","Week 3","Week 4","Week 5"];

function fillWeekly(rows) {
  const map = new Map(DAYS.map(d => [d, 0]));
  for (const r of rows) map.set(r.day, Number(r.rides));
  return DAYS.map(day => ({ day, rides: map.get(day) ?? 0 }));
}

function fillDaily(rows) {
  const map = new Map(HOURS.map(h => [h, 0]));
  for (const r of rows) map.set(r.hour, Number(r.rides));
  return HOURS.map(hour => ({ hour, rides: map.get(hour) ?? 0 }));
}

function fillMonthly(rows) {
  const map = new Map(WEEKS.map(w => [w, 0]));
  for (const r of rows) map.set(r.week, Number(r.rides));
  return WEEKS.map(week => ({ week, rides: map.get(week) ?? 0 }));
}

// GET /api/dashboard/rides/weekly
export async function weekly(req, res) {
  try {
    const q = `
      SELECT
        CASE ((EXTRACT(DOW FROM end_time)::int + 6) % 7)
          WHEN 0 THEN 'Mon'
          WHEN 1 THEN 'Tue'
          WHEN 2 THEN 'Wed'
          WHEN 3 THEN 'Thu'
          WHEN 4 THEN 'Fri'
          WHEN 5 THEN 'Sat'
          WHEN 6 THEN 'Sun'
        END AS day,
        COUNT(*)::int AS rides
      FROM ride
      WHERE end_time IS NOT NULL
        AND end_time >= NOW() - INTERVAL '7 days'
      GROUP BY 1
    `;

    const result = await pool.query(q);
    res.json(fillWeekly(result.rows));
  } catch (error) {
    console.error("Error in weekly stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

// GET /api/dashboard/rides/daily
export async function daily(req, res) {
  try {
    const q = `
      SELECT
        LPAD(((FLOOR(EXTRACT(HOUR FROM end_time)::numeric / 3) * 3)::int)::text, 2, '0')
        || ':00' AS hour,
        COUNT(*)::int AS rides
      FROM ride
      WHERE end_time IS NOT NULL
        AND end_time >= NOW() - INTERVAL '24 hours'
      GROUP BY 1
    `;

    const result = await pool.query(q);
    res.json(fillDaily(result.rows));
  } catch (error) {
    console.error("Error in daily stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

// GET /api/dashboard/rides/monthly
export async function monthly(req, res) {
  try {
    const q = `
      SELECT
        ('Week ' || (FLOOR((EXTRACT(DAY FROM end_time)::numeric - 1) / 7) + 1)::int)::text AS week,
        COUNT(*)::int AS rides
      FROM ride
      WHERE end_time IS NOT NULL
        AND DATE_TRUNC('month', end_time) = DATE_TRUNC('month', NOW())
      GROUP BY 1
    `;

    const result = await pool.query(q);
    res.json(fillMonthly(result.rows));
  } catch (error) {
    console.error("Error in monthly stats:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
