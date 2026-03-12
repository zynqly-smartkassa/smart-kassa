import { test, expect } from "@playwright/test";
import { createUniqueUser, RegisterableUser } from "./userCredentials";
import { authTestIds } from "../../constants/authDataTestId";
import { registerUser } from "./auth";

const registerTestId = authTestIds.register;
const loginTestId = authTestIds.login;
const modalTestId = authTestIds.modal;

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
    await expect(page.getByTestId(registerTestId.vorname)).toBeVisible();

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
    await registerUser(page, createUniqueUser(Date.now()));
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");
    await page.getByTestId(modalTestId.logoutTrigger).click();
    await expect(page.getByTestId(modalTestId.logoutButton)).toBeVisible({
      timeout: 2_000,
    });
    await expect(page.getByTestId(modalTestId.logoutButton)).toHaveText(
      "Abmelden",
      {
        timeout: 2_000,
      },
    );
    await page.getByTestId(modalTestId.logoutButton).click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });

  test("User can register and delete account", async ({ page }) => {
    // Verify login page does not show registration fields
    await page.goto("/login");
    await expect(page.getByTestId(registerTestId.vorname)).toBeHidden();
    await expect(page.getByTestId(loginTestId.email)).toBeVisible();

    // Verify navigation links between login and register pages
    await page.getByTestId(loginTestId.registerLink).click();
    await expect(page).toHaveURL("/register");
    await page.getByTestId(registerTestId.loginLink).click();
    await expect(page).toHaveURL("/login");
    await page.getByTestId(loginTestId.registerLink).click();

    const user: RegisterableUser = createUniqueUser(Date.now());

    await registerUser(page, user);
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");
    await page.getByTestId(modalTestId.deleteAccountTrigger).click();
    await page.getByTestId(modalTestId.confirmPassword).fill(user.password);
    await page.getByTestId(modalTestId.deleteAccountButton).click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });
});
