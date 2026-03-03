import { test, expect } from "@playwright/test";
import { TEST_USER } from "./userCredentials";

test.describe("Auth Flow", () => {
  test("not loged in user gets redirected to /register", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/register/, { timeout: 10_000 });
  });

  test("User can register and lands on Homepage", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByTestId("vorname")).toBeVisible();

    await page.getByTestId("vorname").fill(TEST_USER.vorname);
    await page.getByTestId("nachname").fill(TEST_USER.nachname);
    await page.getByTestId("email").fill(TEST_USER.email);
    await page.getByTestId("Telefonnummer").fill(TEST_USER.telefon);
    await page.getByTestId("FirmenBuchNummer").fill(TEST_USER.fn);
    await page.getByTestId("ATU").fill(TEST_USER.atu);
    await page.getByTestId("password").fill(TEST_USER.password);
    await page.getByTestId("confirmPassword").fill(TEST_USER.password);

    const registerBtn = page.getByTestId("registerButton");
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
    await expect(page.getByTestId("vorname")).toBeVisible();

    await page.getByTestId("vorname").fill(TEST_USER.vorname);
    await page.getByTestId("nachname").fill(TEST_USER.nachname);
    await page.getByTestId("email").fill(uniqueEmail);
    await page.getByTestId("Telefonnummer").fill(uniqueTelefon);
    await page.getByTestId("FirmenBuchNummer").fill(uniqueFn);
    await page.getByTestId("ATU").fill(uniqueAtu);
    await page.getByTestId("password").fill(TEST_USER.password);
    await page.getByTestId("confirmPassword").fill(TEST_USER.password);

    await expect(page.getByTestId("registerButton")).toBeEnabled({
      timeout: 3_000,
    });
    await page.getByTestId("registerButton").click();

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

  test("User can log out and stay's logged out", async ({ page }) => {
    await page.goto("/");

    const reloadId = Date.now();
    const uniqueEmail = `playwright_reload_${reloadId}@test.at`;
    const uniqueFn = `FN${String(reloadId).slice(-6)}b`;
    const uniqueAtu = `ATU${String(reloadId).slice(-9)}`;
    const uniqueTelefon = `+43 660 ${String(reloadId).slice(-7)}`;

    await page.goto("/");
    await expect(page.getByTestId("vorname")).toBeVisible();

    await page.getByTestId("vorname").fill(TEST_USER.vorname);
    await page.getByTestId("nachname").fill(TEST_USER.nachname);
    await page.getByTestId("email").fill(uniqueEmail);
    await page.getByTestId("Telefonnummer").fill(uniqueTelefon);
    await page.getByTestId("FirmenBuchNummer").fill(uniqueFn);
    await page.getByTestId("ATU").fill(uniqueAtu);
    await page.getByTestId("password").fill(TEST_USER.password);
    await page.getByTestId("confirmPassword").fill(TEST_USER.password);

    await expect(page.getByTestId("registerButton")).toBeEnabled({
      timeout: 3_000,
    });
    await page.getByTestId("registerButton").click();

    await expect(page).toHaveURL("/", { timeout: 15_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    await page.goto("/settings");

    await page.getByTestId("modal-logout-trigger").click();
    await expect(page.getByTestId("modal-logout-button")).toBeVisible({
      timeout: 2_000,
    });
    await expect(page.getByTestId("modal-logout-button")).toHaveText(
      "Abmelden",
      { timeout: 2_000 },
    );
    await page.getByTestId("modal-logout-button").click();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
    await page.reload();
    await expect(page).toHaveURL("/register", { timeout: 5_000 });
  });
});
