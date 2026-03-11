import { vi, expect, test, describe, beforeEach } from "vitest";
import { toast } from "sonner";
import { handleTokenError } from "../../src/utils/errorHandling/tokenErrorHandler";

vi.mock("sonner");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleTokenError", () => {
  test("known error calls toast.error with relevant message", () => {
    handleTokenError(new Error("Session Expired"));
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith(
      expect.stringContaining("Sitzung"),
      expect.any(Object)
    );
  });

  test("non-Error value calls toast.error with fallback message", () => {
    handleTokenError("unexpected");
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith(
      expect.stringContaining("Sitzung"),
      expect.any(Object)
    );
  });
});
