/**
 * Test Suite for the Register Page.
 * Tests the functionality of the Register form, including validation and navigation.
 * @author
 */
import { screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { renderWithRouter } from "../../utils/test/renderWithRouter";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import {
  expectValidationMessage,
  fillField,
  type InfoField,
} from "../../utils/test/input";
import { validationMessages } from "../../content/auth/validationMessages";
import { useInvalidEmail, useInvalidPassword } from "../../hooks/useValidator";
import * as authModule from "../../utils/auth";
import type { USER_DTO } from "../../../constants/User";
import Home from "../Home";

// ResizeObserver Mock (Recharts) "Unused"
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// We are relacing axios with a fake mock.
// It needs to stand here, because otherwise the tests would access the real "axios" function
vi.mock("axios");

// When signInUser is called by login() inside auth.ts, which we are also tracking, then this custom
// function is called wether the main action itself.
vi.mock("../../redux/slices/userSlice", () => ({
  // redux action calls are returning this very object
  signInUser: (payload: USER_DTO) => ({ type: "user/signInUser", payload }),
}));

// We are just tracking the function here, which is not a fake function
const mockedRegister = vi.spyOn(authModule, "register");

// we are using a fake function to track if the function was called, and what arguments were used
const dispatch = vi.fn();

// without this, vi would call the real disatch() function, instead of the mock one
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    // Only change disatch, nothing else from redux
    ...actual,
    useDispatch: () => dispatch,
  };
});

describe("Register Page", () => {
  let name: HTMLElement;
  let sirName: HTMLElement;
  let email: HTMLElement;
  let telefon: HTMLElement;
  let fn: HTMLElement;
  let atu: HTMLElement;
  let password: HTMLElement;
  let cp: HTMLElement;
  let registerButton: HTMLElement;

  let info: InfoField[] = [];
  let auth: InfoField[] = [];

  /**
   * Helper function to assert validation messages.
   * It uses includes() to avoid strict text matching issues.
   */

  beforeEach(() => {
    vi.clearAllMocks();

    renderWithRouter(<Login />, ["/register"], [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> }
]);

    // Get all input elements
    name = screen.getByTestId(/vorname/i);
    sirName = screen.getByTestId(/nachname/i);
    email = screen.getByTestId(/email/i);
    telefon = screen.getByTestId(/telefonnummer/i);
    fn = screen.getByTestId(/FirmenBuchNummer/i);
    atu = screen.getByTestId(/atu/i);

    password = screen.getByTestId("password");
    cp = screen.getByTestId("confirmPassword");

    registerButton = screen.getByTestId("register");

    const err = validationMessages.register;

    // Info fields for testing invalid and valid inputs (business data only)
    info = [
      {
        field: name,
        value: "Thomas",
        wrongValue: "",
        validationMessage: err.vorname.required,
      },
      {
        field: sirName,
        value: "Laimer",
        wrongValue: "",
        validationMessage: err.nachname.required,
      },
      {
        field: email,
        value: "Laimer@gmail.com",
        wrongValue: "Laimer@",
        validationMessage: err.email.invalid,
      },
      {
        field: telefon,
        value: "+43 222 45452",
        wrongValue: "452",
        validationMessage: err.phone.invalid,
      },
      {
        field: fn,
        value: "FN123456a",
        wrongValue: "F6a",
        validationMessage: err.fn.invalid,
      },
      {
        field: atu,
        value: "ATU123334455",
        wrongValue: "A55",
        validationMessage: err.atu.invalid,
      },
    ];

    // Auth fields (password, confirmPassword) – also using wrongValue
    auth = [
      {
        field: password,
        value: "Laimer+123",
        wrongValue: "123s",
        validationMessage: err.password.tooShort,
      },
      {
        field: cp,
        value: "Laimer+123",
        wrongValue: "13s",
        validationMessage: err.confirmPassword.invalid,
      },
    ];
  });

  // -----------------------------
  // Test 1: Enable register button with valid data
  // -----------------------------
  it("enables register button when valid data is entered", async () => {
    expect(registerButton).toBeDisabled();

    // Use info array for all business fields
    for (let i = 0; i < info.length; i++) {
      await fillField(info[i].field, info[i].value);
      await userEvent.tab(); // trigger validation
    }

    // Use auth array for auth fields
    for (let i = 0; i < auth.length; i++) {
      await fillField(auth[i].field, auth[i].value);
      await userEvent.tab(); // trigger validation
    }

    await waitFor(
      () => {
        expect(registerButton).toBeEnabled();
      },
      { timeout: 10000 }
    );
  }, 15000);

  // -----------------------------
  // Test 2: Keep register button disabled with invalid data
  // -----------------------------
  it("keeps register button disabled when invalid data is entered", async () => {
    expect(registerButton).toBeDisabled();

    // Use wrongValue for all info fields
    for (let i = 0; i < info.length; i++) {
      await fillField(info[i].field, info[i].wrongValue);
      await userEvent.tab();
      await expectValidationMessage(info[i].validationMessage as string);
    }

    // Use wrongValue for all auth fields
    for (let i = 0; i < auth.length; i++) {
      await fillField(auth[i].field, auth[i].wrongValue);
      await userEvent.tab();
      if (auth[i].validationMessage) {
        await expectValidationMessage(auth[i].validationMessage as string);
      }
    }

    await waitFor(() => {
      expect(registerButton).toBeDisabled();
    });
  });

  // -----------------------------
  // Test 3: Password missing number
  // -----------------------------
  it("shows password error: missing number", async () => {
    // Custom input for this specific password rule, still using wrongValue concept for other tests
    await fillField(password, "Laimer+"); // contains symbol but no number
    await userEvent.tab();

    await expectValidationMessage(
      validationMessages.register.password.missingNumber
    );
  });

  // -----------------------------
  // Test 4: Password missing symbol
  // -----------------------------
  it("shows password error: missing symbol", async () => {
    await fillField(password, "Laimer123"); // contains number but no symbol
    await userEvent.tab();

    await expectValidationMessage(
      validationMessages.register.password.missingSymbol
    );
  });

  // -----------------------------
  // Test 5: Password mismatch
  // -----------------------------
  it("shows password mismatch error", async () => {
    // Use auth values for password as base, but mismatch for confirmPassword
    const pwdInfo = auth[0];
    const confirmInfo = auth[1];

    await fillField(pwdInfo.field, pwdInfo.value);
    await userEvent.tab();
    await fillField(confirmInfo.field, confirmInfo.wrongValue); // mismatch via wrongValue
    await userEvent.tab();

    await expectValidationMessage(
      validationMessages.register.confirmPassword.invalid
    );
  });

  // -----------------------------
  // Test 6: Email validation uses useInvalidEmail function
  // -----------------------------
  it("validates email using useInvalidEmail regex (invalid and valid cases)", async () => {
    // Test that the UI uses the same validation as useInvalidEmail
    const invalidEmails = ["test@", "test@example", "test@example."];

    for (const value of invalidEmails) {
      // Check validator function
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(useInvalidEmail(value)).toBe(true);

      // Check UI behavior
      await fillField(email, value);
      await userEvent.tab();
      await expectValidationMessage(validationMessages.register.email.invalid);
    }

    // Valid email formats
    const validEmails = ["user@example.com", "user.name+tag@example.co.uk"];

    for (const value of validEmails) {
      // Check validator function
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(useInvalidEmail(value)).toBe(false);

      // Check UI behavior
      await fillField(email, value);
      await userEvent.tab();

      await waitFor(() => {
        const msg = screen.queryByText(
          validationMessages.register.email.invalid,
          { exact: false }
        );
        expect(msg).toBeNull();
      });
    }
  });

  // -----------------------------
  // Test 7: Password validation uses useInvalidPassword for all requirements
  // -----------------------------
  it("validates password using useInvalidPassword (length, number, special char)", async () => {
    // Test 1: Too short (< 8 characters) – use wrongValue from auth for consistency
    const pwdInfo = auth[0];
    const tooShort = pwdInfo.wrongValue ?? "Pass+1";
    const validatorResult1 = useInvalidPassword(tooShort);
    expect(validatorResult1.passwordminimum6Chars).toBe(false);
    expect(validatorResult1.passwordIsInvalid).toBe(true);

    await fillField(password, tooShort);
    await userEvent.tab();
    await expectValidationMessage(
      validationMessages.register.password.tooShort
    );

    // Test 2: No number
    const noNumber = "Password+";
    const validatorResult2 = useInvalidPassword(noNumber);
    expect(validatorResult2.passwordhasNumber).toBe(false);
    expect(validatorResult2.passwordIsInvalid).toBe(true);

    await fillField(password, noNumber);
    await userEvent.tab();
    await expectValidationMessage(
      validationMessages.register.password.missingNumber
    );

    // Test 3: No special character
    const noSpecial = "Password123";
    const validatorResult3 = useInvalidPassword(noSpecial);
    expect(validatorResult3.passwordhasSpecialChar).toBe(false);
    expect(validatorResult3.passwordIsInvalid).toBe(true);

    await fillField(password, noSpecial);
    await userEvent.tab();
    await expectValidationMessage(
      validationMessages.register.password.missingSymbol
    );

    // Test 4: Valid password (≥8 characters, number, special character) – use value from auth
    const validPass = pwdInfo.value ?? "Pass+word1";
    const validatorResult4 = useInvalidPassword(validPass);
    expect(validatorResult4.passwordminimum6Chars).toBe(true);
    expect(validatorResult4.passwordhasNumber).toBe(true);
    expect(validatorResult4.passwordhasSpecialChar).toBe(true);
    expect(validatorResult4.passwordIsInvalid).toBe(false);
  });

  // -----------------------------
  // Test 8: Navigation to login page
  // -----------------------------
  it("navigates to login page when clicking login link", async () => {
    await userEvent.click(screen.getByTestId("loginLink"));

    await waitFor(() => {
      expect(screen.queryByTestId("register")).not.toBeInTheDocument();
      expect(screen.queryByTestId("login")).toBeInTheDocument();
    });
  });

  // -----------------------------
  // Test 9: Successful Register
  // -----------------------------
  it("simulates the register function with success", async () => {
    // returns fake data (not a function call, just what to do when it is called)
    mockedRegister.mockImplementation(
      async (
        _firstName,
        _lastName,
        _email,
        _telefonnummer,
        _password,
        _firmenbuchnummer,
        _atu,
        dispatch
      ) => {
        dispatch({
          type: "user/signInUser",
          payload: {
            id: 42,
            firstName: "Max",
            lastName: "Mustermann",
            email: "max@x.com",
            phoneNumber: "phone number need implementation",
          },
        });

        // return successful object
        return {
          message: "User registered successfully",
          accessToken: "FAKE_TOKEN",
          user: { userId: 42, name: "Max", email: "max@x.com" },
        };
      }
    );

    // Fill data
    await fillField(name, "Max");
    await fillField(sirName, "Mustermann");
    await fillField(email, "max@x.com");
    await fillField(telefon, "+43 660 1234567");
    await fillField(fn, "FN123456a");
    await fillField(atu, "ATU123456789");
    await fillField(password, "Max+1234");
    await fillField(cp, "Max+1234");

    // triggers now the mock function above
    await userEvent.click(registerButton);

    // Was the register function called with this data?
    expect(mockedRegister).toHaveBeenCalledWith(
      "Max",
      "Mustermann",
      "max@x.com",
      "+43 660 1234567",
      "Max+1234",
      "FN123456a",
      "ATU123456789",
      expect.any(Function)
    );

    // was it called with this data
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/signInUser",
      payload: {
        id: 42,
        firstName: "Max",
        lastName: "Mustermann",
        email: "max@x.com",
        phoneNumber: "phone number need implementation",
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("register")).not.toBeInTheDocument();
      expect(screen.queryByText(/welcome/i)).toBeInTheDocument();
    });
  });

  // -----------------------------
  // Test 10: Unsuccessful Register due to error
  // -----------------------------
  it("simulates the register function with unsuccess", async () => {
    // Ignore the stderr messages in the console
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // returns fake data (not a function call, just what to do when it is called)
    // We are using here "rejected", because vite needs some time to get into the catch() block
    // Usually the error would be thrown synchronously, but with "rejected" it behaves
    // like a usual failed fetch call
    mockedRegister.mockRejectedValueOnce(new Error("Internal Server error"));

    // Fill data
    await fillField(name, "Max");
    await fillField(sirName, "Mustermann");
    await fillField(email, "max@x.com");
    await fillField(telefon, "+43 660 1234567");
    await fillField(fn, "FN123456a");
    await fillField(atu, "ATU123456789");
    await fillField(password, "Max+1234");
    await fillField(cp, "Max+1234");

    // triggers now the mock function above
    await userEvent.click(registerButton);

    // Was the register function called with this data?
    await waitFor(() => {
      expect(mockedRegister).toHaveBeenCalledWith(
        "Max",
        "Mustermann",
        "max@x.com",
        "+43 660 1234567",
        "Max+1234",
        "FN123456a",
        "ATU123456789",
        expect.any(Function)
      );
    });

    // was it called with this data
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: "user/signInUser",
      })
    );

    // It should still show the login button
    expect(screen.getByTestId("register")).toBeInTheDocument();

    // restore the usual behavior of console.err
    consoleSpy.mockRestore();
  });
});
