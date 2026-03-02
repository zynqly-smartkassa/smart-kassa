import { test, expect } from "@playwright/test";

// Unique Test-Credentials for every test run, to avoid conflicts
const RUN_ID = Date.now();
const TEST_EMAIL = `playwright_${RUN_ID}@test.at`;
const TEST_PASSWORD = "Test1234!";
const TEST_USER = {
  vorname: "Max",
  nachname: "Mustermann",
  email: TEST_EMAIL,
  telefon: `+43 660 ${String(RUN_ID).slice(-7)}`,
  fn: `FN${String(RUN_ID).slice(-6)}a`,
  atu: `ATU${String(RUN_ID).slice(-9)}`,
  password: TEST_PASSWORD,
};

test.describe("Auth Flow", () => {
  test("nicht eingeloggter User wird auf /register weitergeleitet", async ({
    page,
  }) => {
    await page.goto("/");

    // ProtectedRoute erkennt keinen gültigen Token und leitet weiter
    await expect(page).toHaveURL(/\/register/, { timeout: 10_000 });
  });

  test("User kann sich registrieren und landet auf der Homepage", async ({
    page,
  }) => {
    await page.goto("/register");

    // Warte bis das Formular sichtbar ist
    await expect(page.getByTestId("vorname")).toBeVisible();

    // Formulareingaben ausfüllen
    await page.getByTestId("vorname").fill(TEST_USER.vorname);
    await page.getByTestId("nachname").fill(TEST_USER.nachname);
    await page.getByTestId("email").fill(TEST_USER.email);
    await page.getByTestId("Telefonnummer").fill(TEST_USER.telefon);
    await page.getByTestId("FirmenBuchNummer").fill(TEST_USER.fn);
    await page.getByTestId("ATU").fill(TEST_USER.atu);
    await page.getByTestId("password").fill(TEST_USER.password);
    await page.getByTestId("confirmPassword").fill(TEST_USER.password);

    // Submit-Button sollte jetzt aktiv sein (alle Validierungen bestanden)
    const registerBtn = page.getByTestId("registerButton");
    await expect(registerBtn).toBeEnabled({ timeout: 3_000 });

    await registerBtn.click();

    // Nach erfolgreicher Registrierung Weiterleitung zur Homepage
    await expect(page).toHaveURL("/", { timeout: 15_000 });

    // Homepage-Inhalt prüfen – "Willkommen zurück!" erscheint nach Auth
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("eingeloggter User bleibt nach Seiten-Reload eingeloggt", async ({
    page,
  }) => {
    // Alle Felder müssen unique sein, um Konflikte mit dem vorherigen Test zu vermeiden
    const reloadId = Date.now();
    const uniqueEmail = `playwright_reload_${reloadId}@test.at`;
    const uniqueFn = `FN${String(reloadId).slice(-6)}b`;
    const uniqueAtu = `ATU${String(reloadId).slice(-9)}`;
    const uniqueTelefon = `+43 660 ${String(reloadId).slice(-7)}`;

    await page.goto("/register");
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

    // Warte auf Homepage nach Registrierung
    await expect(page).toHaveURL("/", { timeout: 15_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });

    // Seite neu laden
    await page.reload();

    // User muss nach dem Reload immer noch eingeloggt sein
    await expect(page).toHaveURL("/", { timeout: 10_000 });
    await expect(page.getByText("Willkommen zurück!")).toBeVisible({
      timeout: 10_000,
    });
  });
});
