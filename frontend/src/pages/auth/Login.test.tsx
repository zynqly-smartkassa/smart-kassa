/**
 * Test Suite for the Login Page.
 * Tests the functionality of the Login form, including validation and navigation.
 * @author 
 */
import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { renderWithRouter } from "../../utils/test/renderWithRouter";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import Login from "./Login";
import { fillField, type InfoField, expectValidationMessage } from "../../utils/test/input";
import { validationMessages } from "../../content/auth/validationMessages";
import { useInvalidPassword } from "../../hooks/useValidator";
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
  signInUser: (payload: USER_DTO) => ({ type: "user/signInUser", payload })
}));

// We are just tracking the function here, which is not a fake function
const mockedLogin = vi.spyOn(authModule, "login");
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

describe("Login Page", () => {
  let email: HTMLElement;
  let password: HTMLElement;
  let loginButton: HTMLElement;
  let inputs: InfoField[] = [];

  beforeEach(() => {

    vi.clearAllMocks();
    
   renderWithRouter(<Login />, ["/login"], [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Home /> }
]);

    email = screen.getByTestId(/email/i);
    password = screen.getByTestId("password");
    loginButton = screen.getByTestId("login");

    inputs = [
      {
        field: email,
        value: "Laimer@gmail.com",
        wrongValue: "Laimer@",
        validationMessage: validationMessages.login.email.invalid,
      },
      {
        field: password,
        value: "Laimer+123",
        wrongValue: "DDDs",
        validationMessage: validationMessages.login.password.tooShort,
      },
    ];

  });

  // -----------------------------
  // Test 1: Enable login button when correct data is entered
  // -----------------------------
  it("enables login button when valid data is entered", async () => {
    expect(loginButton).toBeDisabled();

    for (let i = 0; i < inputs.length; i++) {
      await fillField(inputs[i].field, inputs[i].value);
      await userEvent.tab(); // trigger blur/validation

      if (i < inputs.length - 1) {
        expect(loginButton).toBeDisabled();
      }
    }

    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
  });

  // -----------------------------
  // Test 2: Keep login button disabled with invalid data and show validation messages
  // -----------------------------
  it("keeps login button disabled when invalid data is entered", async () => {
    expect(loginButton).toBeDisabled();

    for (let i = 0; i < inputs.length; i++) {
      await fillField(inputs[i].field, inputs[i].wrongValue);
      await userEvent.tab();

      // Check validation message
      await expectValidationMessage(inputs[i].validationMessage as string);

      if (i < inputs.length - 1) {
        expect(loginButton).toBeDisabled();
      }
    }

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
    });
  });

  // -----------------------------
  // Test 3: Password must be at least 8 characters (uses useInvalidPassword)
  // -----------------------------
  it("requires password with at least 8 characters using useInvalidPassword", async () => {
    // Too short (< 8 characters) - Login only checks length
    const shortPass = "1234567";
    const validatorResult = useInvalidPassword(shortPass);
    expect(validatorResult.passwordminimum6Chars).toBe(false);

    await fillField(password, shortPass);
    await userEvent.tab();
    await expectValidationMessage(
      validationMessages.login.password.tooShort
    );

    // Long enough (≥8 characters) - Login accepts this
    const longPass = "Laimer+123";
    const validatorResult2 = useInvalidPassword(longPass);
    expect(validatorResult2.passwordminimum6Chars).toBe(true);

    await fillField(password, longPass);
    await userEvent.tab();

    await waitFor(() => {
      const msg = screen.queryByText(
        validationMessages.login.password.tooShort,
        { exact: false }
      );
      expect(msg).toBeNull();
    });
  });

  // -----------------------------
  // Test 4: Navigation to Register Page
  // -----------------------------
  it("navigates to register page when clicking 'Switch to Register' link", async () => {
    await userEvent.click(screen.getByTestId("registerLink"));

    await waitFor(() => {
      expect(screen.queryByTestId("login")).not.toBeInTheDocument();
      expect(screen.queryByTestId("register")).toBeInTheDocument();
    });
  });


  // -----------------------------
  // Test 5: Login mock (Successful)
  // -----------------------------
  it("simulates the login function with success", async () => {

    // returns fake data (not a function call, just what to do when it is called)
    mockedLogin.mockImplementation(async (_email, _password, dispatch) => {
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
        accessToken: "FAKE_TOKEN",
        user: { userId: 42, name: "Max", email: "max@x.com" }
      };
    });

    // Fill data
    await fillField(email, "max@x.com");
    await fillField(password, "Max+1234"); //simulating valid credentials

    // triggers now the mock function above
    await userEvent.click(loginButton);

    // Was the login function called with this data?
    expect(mockedLogin).toHaveBeenCalledWith(
      "max@x.com",
      "Max+1234",
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
  expect(screen.queryByTestId("login")).not.toBeInTheDocument();
  expect(screen.queryByText(/welcome/i)).toBeInTheDocument();
});

  });

  // -----------------------------
  // Test 6: Login mock (Unsuccessful)
  // -----------------------------
  it("shows still the Login if given wrong credentials", async () => {

    // Ignore the stderr messages in the console
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // returns fake data (not a function call, just what to do when it is called)
    // We are using here "rejected", because vite needs some time to get into the catch() block
    // Usually the error would be thrown synchronously, but with "rejected" it behaves
    // like a usual failed fetch call
    mockedLogin.mockRejectedValueOnce(new Error("Wrong Email or Password"));

     // Fill data
    await fillField(email, "wrong@user.com");
    await fillField(password, "WrongPass123");

    // triggers now the mock function above
    await userEvent.click(loginButton);

    // Was the login function called with this data?
    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith(
        "wrong@user.com",
        "WrongPass123",
        expect.any(Function)
      );
    });

    // We check if he called dispatch
   expect(dispatch).not.toHaveBeenCalledWith(
    expect.objectContaining({
      type: "user/signInUser"
    })
  );

  // It should still show the login button
  expect(screen.getByTestId("login")).toBeInTheDocument();
  
  // restore the usual behavior of console.err
  consoleSpy.mockRestore();

  });

});

