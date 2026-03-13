import { expect, test, describe } from "vitest";
import { formatTime } from "../../src/utils/rides/formatTime";

describe("formatTime", () => {
  test("0 seconds → 00:00:00", () => {
    expect(formatTime(0)).toBe("00:00:00");
  });

  test("90 seconds → 00:01:30", () => {
    expect(formatTime(90)).toBe("00:01:30");
  });

  test("3661 seconds → 01:01:01", () => {
    expect(formatTime(3661)).toBe("01:01:01");
  });

  test("single-digit values are zero-padded", () => {
    expect(formatTime(65)).toBe("00:01:05");
  });

  test("exactly 1 hour → 01:00:00", () => {
    expect(formatTime(3600)).toBe("01:00:00");
  });
});
