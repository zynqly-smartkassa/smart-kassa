import { test, expect, devices } from "@playwright/test";
import { LOGIN_USER } from "./userCredentials";
import { loginUser } from "./helpers";
import { rideTestIds } from "../constants/rideDataTestId";

const ri = rideTestIds.ride;
const p = rideTestIds.payment;
const inv = rideTestIds.invoice;

// Vienna city center for GPS mock
const VIENNA = { latitude: 48.2082, longitude: 16.3738 };

/**
 * iPhone 13 emulation — the ride page only shows its UI on mobile (md:hidden).
 * Geolocation is mocked since Capacitor falls back to navigator.geolocation in the browser.
 */
test.use({
  ...devices["iPhone 13"],
  geolocation: VIENNA,
  permissions: ["geolocation"],
});

test.describe("Ride Flow (Mobile)", () => {
  test("Start Ride → End Ride → Payment → Invoice with QR Code", async ({
    page,
  }) => {
    // Log in with the fixed ride-flow test user (john@doe.com must exist in the test DB)
    await loginUser(page, LOGIN_USER);

    // ── 1. Start ride ─────────────────────────────────────────────────────────

    await page.goto("/ride");

    // Wait for GPS to be ready (StatusOverlay disappears, timer becomes visible)
    await expect(page.getByTestId(ri.timer)).toBeVisible({ timeout: 15_000 });

    // Select ride type
    await page.getByTestId(ri.selectTrigger).click();
    await page.getByRole("option", { name: "Taxifahrt" }).click();

    // Enter destination address
    await page.getByTestId(ri.address).fill("Graz, Hauptbahnhof");

    // Calculate route (Nominatim geocoding + 1s internal delay)
    await page.getByTestId(ri.calculateRoute).click();

    // Wait until the start button is enabled
    await expect(page.getByTestId(ri.startRide)).toBeEnabled({
      timeout: 20_000,
    });

    await page.getByTestId(ri.startRide).click();

    // ── 2. End ride ───────────────────────────────────────────────────────────

    // Wait 5s — checkRide() requires timer > 3 before the ride can be saved
    await page.waitForTimeout(5_000);

    await page.getByTestId(ri.endRide).click();

    // Wait for navigation to payment page (reverseGeocode + sendRide API call)
    await expect(page).toHaveURL(/\/payment\//, { timeout: 30_000 });

    // ── 3. Fill payment ───────────────────────────────────────────────────────

    await page.getByTestId(p.ridePrice).fill("15");
    await page.getByTestId(p.cashButton).click();

    await page.getByTestId(p.submitButton).click();

    // Wait for navigation to the invoice detail page
    await expect(page).toHaveURL(/\/invoices\//, { timeout: 15_000 });

    // ── 4. View invoice with QR code ──────────────────────────────────────────

    await page.getByTestId(inv.qrcodeTab).click();
    await expect(page.getByTestId(inv.qrcodeContainer)).toBeVisible({
      timeout: 5_000,
    });
  });
});
