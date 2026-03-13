import { expect, test, describe } from "vitest";
import { getRidesToday, getRidesYesterday } from "../../src/utils/rides/getRides";
import type { AllRide } from "../../constants/AllRide";

// Helper: creates a minimal AllRide object with only start_time set.
// All other fields are irrelevant for these tests, so we fill them with
// dummy values to satisfy the TypeScript interface.
function makeRide(startTime: string): AllRide {
  return {
    ride_id: 1,
    vehicle_id: 1,
    user_id: 1,
    start_address: "",
    end_address: "",
    start_time: startTime,
    end_time: startTime,
    duration: "00:10:00",
    distance: 5,
    ride_type: "standard",
    whole_ride: [],
  };
}

// Helper: converts a JS Date to the "YYYY-MM-DDTHH:MM:SS" format that the
// app stores in start_time. This keeps test dates in sync with the real
// clock, so the tests never need a hardcoded date that could expire.
function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}T00:00:00`;
}

// Compute today and yesterday at module load time.
// Both filter functions compare against new Date() internally, so using
// the same reference point here keeps everything consistent.
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// Three test rides that cover the three relevant cases:
//   rideToday    → should be returned by getRidesToday
//   rideYesterday → should be returned by getRidesYesterday
//   rideOld      → should never be returned by either function
const rideToday = makeRide(toDateString(today));
const rideYesterday = makeRide(toDateString(yesterday));
const rideOld = makeRide("2020-01-01T00:00:00");

// The full set of rides passed to the filter functions in most tests.
const allRides = [rideToday, rideYesterday, rideOld];

// ─────────────────────────────────────────────
// getRidesToday
// ─────────────────────────────────────────────
describe("getRidesToday", () => {
  test("returns only rides from today", () => {
    const result = getRidesToday(allRides);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(rideToday);
  });

  test("returns empty array when no rides are from today", () => {
    expect(getRidesToday([rideYesterday, rideOld])).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────
// getRidesYesterday
// ─────────────────────────────────────────────
describe("getRidesYesterday", () => {
  test("returns only rides from yesterday", () => {
    const result = getRidesYesterday(allRides);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(rideYesterday);
  });

  test("returns empty array when no rides are from yesterday", () => {
    expect(getRidesYesterday([rideToday, rideOld])).toHaveLength(0);
  });
});
