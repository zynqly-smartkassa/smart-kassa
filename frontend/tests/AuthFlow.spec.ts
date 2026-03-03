import { test, expect } from "@playwright/test";
import { createUniqueUser, toDeletedUser } from "./userCredentials";
import { authTestIds } from "../constants/authDataTestId";
import { registerUser, loginUser } from "./helpers";

const r = authTestIds.register;
const l = authTestIds.login;
const m = authTestIds.modal;

test.describe("Auth Flow", () => {
  test("Not logged-in user gets redirected to /register", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/register/, { timeout: 10_000 });
  });

  test("User can register and lands on Homepage", async ({ page }) => {
    await registerUser(page, createUniqueUser(Date.now()));

    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("User stays on page after successful register", async ({ page }) => {
    // Verify that unauthenticated users are redirected to /register
    await page.goto("/");
    await expect(page.getByTestId(r.vorname)).toBeVisible();

    await registerUser(page, createUniqueUser(Date.now()));
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.reload();
    await expect(page).toHaveURL("/", { timeout: 10_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("User can log out and stays logged out", async ({ page }) => {
    await registerUser(page, toDeletedUser);
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");
    await page.getByTestId(m.logoutTrigger).click();
    await expect(page.getByTestId(m.logoutButton)).toBeVisible({
      timeout: 2_000,
    });
    await expect(page.getByTestId(m.logoutButton)).toHaveText("Abmelden", {
      timeout: 2_000,
    });
    await page.getByTestId(m.logoutButton).click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });

  test("User can log in using existing data and delete account", async ({
    page,
  }) => {
    // Verify login page does not show registration fields
    await page.goto("/login");
    await expect(page.getByTestId(r.vorname)).toBeHidden();
    await expect(page.getByTestId(l.email)).toBeVisible();

    // Verify navigation links between login and register pages
    await page.getByTestId(l.registerLink).click();
    await expect(page).toHaveURL("/register");
    await page.getByTestId(r.loginLink).click();
    await expect(page).toHaveURL("/login");

    await loginUser(page, toDeletedUser);
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");
    await page.getByTestId(m.deleteAccountTrigger).click();
    await page.getByTestId(m.confirmPassword).fill(toDeletedUser.password);
    await page.getByTestId(m.deleteAccountButton).click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });
});
