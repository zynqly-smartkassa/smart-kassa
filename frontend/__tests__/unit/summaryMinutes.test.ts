import { expect, test, describe } from "vitest";
import {
  durationToMinutes,
  formatMinutes,
  formatTimeAgo,
} from "../../src/utils/rides/summaryMinutes";

// ─────────────────────────────────────────────
// durationToMinutes
// Converts "HH:MM:SS" to total minutes.
// Seconds are rounded to the nearest minute.
// ─────────────────────────────────────────────
describe("durationToMinutes", () => {
  test("converts hours and minutes correctly", () => {
    expect(durationToMinutes("01:30:00")).toBe(90);
  });

  test("rounds up 30+ seconds to the next minute", () => {
    expect(durationToMinutes("00:01:30")).toBe(2); // 1m 30s → rounds to 2min
  });

  test("ignores seconds below 30 (rounds down)", () => {
    expect(durationToMinutes("00:05:20")).toBe(5); // 20s rounds down
  });

  test("zero duration returns 0", () => {
    expect(durationToMinutes("00:00:00")).toBe(0);
  });
});

// ─────────────────────────────────────────────
// formatMinutes
// Formats a raw minute count into a human-readable string.
// Three cases: hours+minutes, hours only, minutes only.
// ─────────────────────────────────────────────
describe("formatMinutes", () => {
  test("shows hours and minutes when both are non-zero", () => {
    expect(formatMinutes(90)).toBe("1 Std 30 Min");
  });

  test("shows only hours when minutes are zero", () => {
    expect(formatMinutes(120)).toBe("2 Std");
  });

  test("shows only minutes when less than one hour", () => {
    expect(formatMinutes(45)).toBe("45 Min");
  });

  test("0 minutes returns '0 Min'", () => {
    expect(formatMinutes(0)).toBe("0 Min");
  });
});

// ─────────────────────────────────────────────
// formatTimeAgo
// Converts an absolute "YYYY-MM-DD HH:MM:SS" timestamp to a relative string.
// We build timestamps relative to now so the tests never expire.
// ─────────────────────────────────────────────
describe("formatTimeAgo", () => {
  // Helper: returns a "YYYY-MM-DD HH:MM:SS" string offset by the given ms from now
  function relativeTimestamp(offsetMs: number): string {
    const d = new Date(Date.now() - offsetMs);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  test("returns 'just now' for very recent timestamps", () => {
    expect(formatTimeAgo(relativeTimestamp(5_000))).toBe("just now");
  });

  test("returns minutes ago for a few minutes back", () => {
    expect(formatTimeAgo(relativeTimestamp(5 * 60_000))).toBe("5 minutes ago");
  });

  test("returns hours ago for a few hours back", () => {
    expect(formatTimeAgo(relativeTimestamp(3 * 3_600_000))).toBe("about 3 hours ago");
  });

  test("returns days ago for a few days back", () => {
    expect(formatTimeAgo(relativeTimestamp(3 * 86_400_000))).toBe("about 3 days ago");
  });
});
