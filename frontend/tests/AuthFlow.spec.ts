import { test, expect } from "@playwright/test";
import { TEST_USER } from "./userCredentials";
import { authTestIds } from "../constants/authDataTestId";

const r = authTestIds.register;
const l = authTestIds.login;
const m = authTestIds.modal;

test.describe("Auth Flow", () => {
  test("not loged in user gets redirected to /register", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/register/, { timeout: 10_000 });
  });

  test("User can register and lands on Homepage", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByTestId(r.vorname)).toBeVisible();

    await page.getByTestId(r.vorname).fill(TEST_USER.vorname);
    await page.getByTestId(r.nachname).fill(TEST_USER.nachname);
    await page.getByTestId(r.email).fill(TEST_USER.email);
    await page.getByTestId(r.telefonnummer).fill(TEST_USER.telefon);
    await page.getByTestId(r.firmenBuchNummer).fill(TEST_USER.fn);
    await page.getByTestId(r.atu).fill(TEST_USER.atu);
    await page.getByTestId(r.password).fill(TEST_USER.password);
    await page.getByTestId(r.confirmPassword).fill(TEST_USER.password);

    const registerBtn = page.getByTestId(r.registerButton);
    await expect(registerBtn).toBeEnabled({ timeout: 3_000 });

    await registerBtn.click();

    await expect(page).toHaveURL("/", { timeout: 15_000 });

    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("User stays on page after successfull register", async ({ page }) => {
    const reloadId = Date.now();
    const uniqueEmail = `playwright_reload_${reloadId}@test.at`;
    const uniqueFn = `FN${String(reloadId).slice(-6)}b`;
    const uniqueAtu = `ATU${String(reloadId).slice(-9)}`;
    const uniqueTelefon = `+43 660 ${String(reloadId).slice(-7)}`;

    await page.goto("/");
    await expect(page.getByTestId(r.vorname)).toBeVisible();

    await page.getByTestId(r.vorname).fill(TEST_USER.vorname);
    await page.getByTestId(r.nachname).fill(TEST_USER.nachname);
    await page.getByTestId(r.email).fill(uniqueEmail);
    await page.getByTestId(r.telefonnummer).fill(uniqueTelefon);
    await page.getByTestId(r.firmenBuchNummer).fill(uniqueFn);
    await page.getByTestId(r.atu).fill(uniqueAtu);
    await page.getByTestId(r.password).fill(TEST_USER.password);
    await page.getByTestId(r.confirmPassword).fill(TEST_USER.password);

    await expect(page.getByTestId(r.registerButton)).toBeEnabled({
      timeout: 3_000,
    });
    await page.getByTestId(r.registerButton).click();

    await expect(page).toHaveURL("/", { timeout: 15_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.reload();

    await expect(page).toHaveURL("/", { timeout: 10_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });

  const reloadId = Date.now();
  const uniqueEmail = `playwright_reload_1@test.at`;
  const uniqueFn = `FN${String(reloadId).slice(-6)}b`;
  const uniqueAtu = `ATU${String(reloadId).slice(-9)}`;
  const uniqueTelefon = `+43 660 ${String(reloadId).slice(-7)}`;

  test("User can log out and stay's logged out", async ({ page }) => {
    await page.goto("/");

    await page.goto("/");
    await expect(page.getByTestId(r.vorname)).toBeVisible();

    await page.getByTestId(r.vorname).fill(TEST_USER.vorname);
    await page.getByTestId(r.nachname).fill(TEST_USER.nachname);
    await page.getByTestId(r.email).fill(uniqueEmail);
    await page.getByTestId(r.telefonnummer).fill(uniqueTelefon);
    await page.getByTestId(r.firmenBuchNummer).fill(uniqueFn);
    await page.getByTestId(r.atu).fill(uniqueAtu);
    await page.getByTestId(r.password).fill(TEST_USER.password);
    await page.getByTestId(r.confirmPassword).fill(TEST_USER.password);

    await expect(page.getByTestId(r.registerButton)).toBeEnabled({
      timeout: 3_000,
    });
    await page.getByTestId(r.registerButton).click();

    await expect(page).toHaveURL("/", { timeout: 15_000 });
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
    await page.goto("/login");
    await expect(page.getByTestId(r.vorname)).toBeHidden();
    await expect(page.getByTestId(l.email)).toBeVisible();
    await page.getByTestId(l.registerLink).click();
    await expect(page).toHaveURL("/register");
    await page.getByTestId(r.loginLink).click();
    await expect(page).toHaveURL("/login");
    await page.getByTestId(l.email).fill(uniqueEmail);
    await page.getByTestId(l.password).fill(TEST_USER.password);
    await page.getByTestId(l.loginButton).click();
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");
    await page.getByTestId(m.deleteAccountTrigger).click();
    await page.getByTestId(m.confirmPassword).fill(TEST_USER.password);
    await page.getByTestId(m.deleteAccountButton).click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });
});
