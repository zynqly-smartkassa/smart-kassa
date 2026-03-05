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
  test("Log in using existing User (John Doe) → Start Ride → End Ride → Payment → Invoice with QR Code", async ({
    page,
  }) => {
    await loginUser(page, LOGIN_USER);


    await page.goto("/ride");

    await expect(page.getByTestId(ri.timer)).toBeVisible({ timeout: 15_000 });

    await page.getByTestId(ri.selectTrigger).click();
    await page.getByRole("option", { name: "Taxifahrt" }).click();

    await page.getByTestId(ri.address).fill("Graz, Hauptbahnhof");

    await page.getByTestId(ri.calculateRoute).click();

    await expect(page.getByTestId(ri.startRide)).toBeEnabled({
      timeout: 20_000,
    });

    await page.getByTestId(ri.startRide).click();

    await page.waitForTimeout(5_000);

    await page.getByTestId(ri.endRide).click();

    await expect(page).toHaveURL(/\/payment\//, { timeout: 30_000 });

    await page.getByTestId(p.ridePrice).fill("15");
    await page.getByTestId(p.cashButton).click();

    await page.getByTestId(p.submitButton).click();

    await expect(page).toHaveURL(/\/invoices\//, { timeout: 15_000 });


    await page.getByTestId(inv.qrcodeTab).click();
    await expect(page.getByTestId(inv.qrcodeContainer)).toBeVisible({
      timeout: 5_000,
    });
  });
});
