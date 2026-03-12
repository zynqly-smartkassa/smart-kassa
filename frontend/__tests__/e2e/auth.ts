import { expect, type Page } from "@playwright/test";
import { authTestIds } from "../../constants/authDataTestId";
import { RegisterableUser } from "./userCredentials";

const registerAuthId = authTestIds.register;
const loginAuthId = authTestIds.login;

/**
 * Navigates to `/register`, fills in all registration fields, submits the form,
 * and asserts that the user lands on the homepage (`/`).
 */
export async function registerUser(
  page: Page,
  user: RegisterableUser,
): Promise<void> {
  await page.goto("/register");
  await page.getByTestId(registerAuthId.vorname).fill(user.vorname);
  await page.getByTestId(registerAuthId.nachname).fill(user.nachname);
  await page.getByTestId(registerAuthId.email).fill(user.email);
  await page.getByTestId(registerAuthId.telefonnummer).fill(user.telefon);
  await page.getByTestId(registerAuthId.firmenBuchNummer).fill(user.fn);
  await page.getByTestId(registerAuthId.atu).fill(user.atu);
  await page.getByTestId(registerAuthId.password).fill(user.password);
  await page.getByTestId(registerAuthId.confirmPassword).fill(user.password);
  await expect(page.getByTestId(registerAuthId.registerButton)).toBeEnabled({
    timeout: 3_000,
  });
  await page.getByTestId(registerAuthId.registerButton).click();
  await expect(page).toHaveURL("/", { timeout: 15_000 });
}

/**
 * Navigates to `/login`, fills in email and password, submits the form,
 * and asserts that the user lands on the homepage (`/`).
 */
export async function loginUser(
  page: Page,
  user: RegisterableUser,
): Promise<void> {
  await page.goto("/login");
  await page.getByTestId(loginAuthId.email).fill(user.email);
  await page.getByTestId(loginAuthId.password).fill(user.password);
  await page.getByTestId(loginAuthId.loginButton).click();
  await expect(page).toHaveURL("/", { timeout: 15_000 });
}
