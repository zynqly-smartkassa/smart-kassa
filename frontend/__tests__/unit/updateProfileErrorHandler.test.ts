import { expect, test, describe } from "vitest";
import { handleUpdateProfileError } from "../../src/utils/errorHandling/updateProfileErrorHandler";

describe("handleUpdateProfileError", () => {
  test("Error instance returns its message", () => {
    const result = handleUpdateProfileError(new Error("Email already in use"));
    expect(result).toBe("Email already in use");
  });

  test("non-Error value returns generic message", () => {
    const result = handleUpdateProfileError("something");
    expect(result).toContain("unerwarteter Fehler");
  });
});
