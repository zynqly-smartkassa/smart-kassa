import { expect, test, describe } from "vitest";
import { date, distance, duration, timeToSeconds } from "../../src/utils/rides/sort";
import type { AllRide } from "../../constants/AllRide";

// Minimal ride factory — only the fields sort.ts actually uses
function makeRide(overrides: Partial<AllRide>): AllRide {
  return {
    ride_id: 1,
    vehicle_id: 1,
    user_id: 1,
    start_address: "",
    end_address: "",
    start_time: "2024-01-01T00:00:00",
    end_time: "2024-01-01T00:30:00",
    duration: "00:30:00",
    distance: 10,
    ride_type: "standard",
    whole_ride: [],
    ...overrides,
  };
}

const rideA = makeRide({ ride_id: 1, start_time: "2024-01-01T08:00:00", distance: 5, duration: "00:10:00" });
const rideB = makeRide({ ride_id: 2, start_time: "2024-01-03T12:00:00", distance: 20, duration: "01:00:00" });
const rideC = makeRide({ ride_id: 3, start_time: "2024-01-02T18:00:00", distance: 10, duration: "00:30:00" });

// Helper to get a fresh copy so mutations don't bleed between tests
function rides() {
  return [{ ...rideA }, { ...rideB }, { ...rideC }];
}

// ─────────────────────────────────────────────
// timeToSeconds
// ─────────────────────────────────────────────
describe("timeToSeconds", () => {
  test("00:00:00 → 0", () => {
    expect(timeToSeconds("00:00:00")).toBe(0);
  });

  test("00:01:30 → 90", () => {
    expect(timeToSeconds("00:01:30")).toBe(90);
  });

  test("01:00:00 → 3600", () => {
    expect(timeToSeconds("01:00:00")).toBe(3600);
  });
});

// ─────────────────────────────────────────────
// sort.date
// ─────────────────────────────────────────────
describe("sort.date", () => {
  test("descending: newest ride first", () => {
    const sorted = date(rides(), true);
    expect(sorted.map((r) => r.ride_id)).toEqual([2, 3, 1]);
  });

  test("ascending: oldest ride first", () => {
    const sorted = date(rides(), false);
    expect(sorted.map((r) => r.ride_id)).toEqual([1, 3, 2]);
  });
});

// ─────────────────────────────────────────────
// sort.distance
// ─────────────────────────────────────────────
describe("sort.distance", () => {
  test("descending: longest distance first", () => {
    const sorted = distance(rides(), true);
    expect(sorted.map((r) => r.distance)).toEqual([20, 10, 5]);
  });

  test("ascending: shortest distance first", () => {
    const sorted = distance(rides(), false);
    expect(sorted.map((r) => r.distance)).toEqual([5, 10, 20]);
  });
});

// ─────────────────────────────────────────────
// sort.duration
// ─────────────────────────────────────────────
describe("sort.duration", () => {
  test("descending: longest ride first", () => {
    const sorted = duration(rides(), true);
    expect(sorted.map((r) => r.duration)).toEqual(["01:00:00", "00:30:00", "00:10:00"]);
  });

  test("ascending: shortest ride first", () => {
    const sorted = duration(rides(), false);
    expect(sorted.map((r) => r.duration)).toEqual(["00:10:00", "00:30:00", "01:00:00"]);
  });
});
