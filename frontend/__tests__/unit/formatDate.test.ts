import { expect, test, describe } from "vitest";
import { formatDate } from "../../src/utils/formatDate";

// formatDate converts an ISO date string to the German "de-DE" locale format.
// Example output: "17. Dez. 2025, 14:30"
// We avoid asserting the exact locale string (it can differ by OS/Node version),
// so we check the structural parts we care about instead.
describe("formatDate", () => {
  test("returns null for undefined input", () => {
    expect(formatDate(undefined)).toBeNull();
  });

  test("returns null for empty string", () => {
    expect(formatDate("")).toBeNull();
  });

  test("contains the correct year for a known date", () => {
    const result = formatDate("2025-12-17T14:30:00");
    expect(result).toContain("2025");
  });

  test("contains the correct hour for a known date", () => {
    const result = formatDate("2025-12-17T14:30:00");
    // The hour "14" must appear somewhere in the formatted string
    expect(result).toContain("14");
  });

  test("returns a non-empty string for a valid date", () => {
    const result = formatDate("2024-06-01T08:00:00");
    expect(result).not.toBeNull();
    expect(result!.length).toBeGreaterThan(0);
  });
});
