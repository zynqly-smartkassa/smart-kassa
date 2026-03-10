import { expect, type Page } from "@playwright/test";
import { authTestIds } from "../../constants/authDataTestId";

const r = authTestIds.register;
const l = authTestIds.login;

export type RegisterableUser = {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  fn: string;
  atu: string;
  password: string;
};

/**
 * Navigates to `/register`, fills in all registration fields, submits the form,
 * and asserts that the user lands on the homepage (`/`).
 */
export async function registerUser(
  page: Page,
  user: RegisterableUser,
): Promise<void> {
  await page.goto("/register");
  await page.getByTestId(r.vorname).fill(user.vorname);
  await page.getByTestId(r.nachname).fill(user.nachname);
  await page.getByTestId(r.email).fill(user.email);
  await page.getByTestId(r.telefonnummer).fill(user.telefon);
  await page.getByTestId(r.firmenBuchNummer).fill(user.fn);
  await page.getByTestId(r.atu).fill(user.atu);
  await page.getByTestId(r.password).fill(user.password);
  await page.getByTestId(r.confirmPassword).fill(user.password);
  await expect(page.getByTestId(r.registerButton)).toBeEnabled({
    timeout: 3_000,
  });
  await page.getByTestId(r.registerButton).click();
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
  await page.getByTestId(l.email).fill(user.email);
  await page.getByTestId(l.password).fill(user.password);
  await page.getByTestId(l.loginButton).click();
  await expect(page).toHaveURL("/", { timeout: 15_000 });
}
