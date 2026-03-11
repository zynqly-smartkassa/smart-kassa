import { expect, test, describe } from "vitest";
import {
  handleRegisterError,
  handleLoginError,
  handleLogoutError,
  handleDeleteAccountError,
} from "../../src/utils/errorHandling/authErrorHandler";

// ─────────────────────────────────────────────
// handleRegisterError
// ─────────────────────────────────────────────
describe("handleRegisterError", () => {
  test("known error: email already exists", () => {
    const result = handleRegisterError(new Error("Email already exists"));
    expect(result).toContain("Email");
  });

  test("known error: empty fields returns field names", () => {
    const result = handleRegisterError(new Error("Empty Fields: email, phone"));
    expect(result).toContain("email, phone");
  });

  test("unknown error falls back to generic message", () => {
    const result = handleRegisterError(new Error("something unexpected"));
    expect(result).toContain("Registrierung fehlgeschlagen");
  });

  test("non-Error value falls back to generic message", () => {
    const result = handleRegisterError("not an error object");
    expect(result).toContain("Registrierung fehlgeschlagen");
  });
});

// ─────────────────────────────────────────────
// handleLoginError
// ─────────────────────────────────────────────
describe("handleLoginError", () => {
  test("known error: wrong credentials", () => {
    const result = handleLoginError(new Error("Wrong Email or Password"));
    expect(result).toContain("Passwort");
  });

  test("known error: user not found", () => {
    const result = handleLoginError(new Error("User Not Found"));
    expect(result).toContain("E-Mail-Adresse");
  });

  test("unknown error falls back to generic message", () => {
    const result = handleLoginError(new Error("something unexpected"));
    expect(result).toContain("Login fehlgeschlagen");
  });

  test("non-Error value falls back to generic message", () => {
    const result = handleLoginError("not an error object");
    expect(result).toContain("Login fehlgeschlagen");
  });
});

// ─────────────────────────────────────────────
// handleLogoutError
// ─────────────────────────────────────────────
describe("handleLogoutError", () => {
  test("known error: network error", () => {
    const result = handleLogoutError(new Error("Network Error"));
    expect(result).toContain("Internetverbindung");
  });

  test("unknown error falls back to generic message", () => {
    const result = handleLogoutError(new Error("something unexpected"));
    expect(result).toContain("Abmeldung fehlgeschlagen");
  });

  test("non-Error value falls back to generic message", () => {
    const result = handleLogoutError(42);
    expect(result).toContain("Abmeldung fehlgeschlagen");
  });
});

// ─────────────────────────────────────────────
// handleDeleteAccountError
// ─────────────────────────────────────────────
describe("handleDeleteAccountError", () => {
  test("known error: invalid password", () => {
    const result = handleDeleteAccountError(new Error("Invalid Password"));
    expect(result).toContain("Passwort");
  });

  test("non-Error value falls back to generic message", () => {
    const result = handleDeleteAccountError(null);
    expect(result).toContain("Konto konnte nicht gelöscht");
  });

  test("unknown error falls back to generic message", () => {
    const result = handleDeleteAccountError(new Error("something unexpected"));
    expect(result).toContain("Konto konnte nicht gelöscht");
  });
});
