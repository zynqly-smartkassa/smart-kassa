var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig, devices } from "@playwright/test";
var VIENNA = { latitude: 48.2082, longitude: 16.3738 };
export default defineConfig({
    testDir: "./__tests__/e2e",
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 3,
    reporter: [["html", { open: "never" }], ["list"]],
    use: {
        baseURL: "http://localhost:5173",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        // Desktop-Browser: all Tests except RideFlow
        {
            name: "chromium",
            use: __assign({}, devices["Desktop Chrome"]),
            testIgnore: ["**/RideFlow.spec.ts"],
        },
        {
            name: "firefox",
            use: __assign({}, devices["Desktop Firefox"]),
            testIgnore: ["**/RideFlow.spec.ts"],
        },
        {
            name: "webkit",
            use: __assign({}, devices["Desktop Safari"]),
            testIgnore: ["**/RideFlow.spec.ts"],
        },
        // Dedicated Mobile project only for RideFlow
        // Playwright emulates iPhone 13 via Chromium CDP (only browser with full device emulation support)
        {
            name: "mobile",
            use: __assign(__assign({}, devices["iPhone 13"]), { geolocation: VIENNA, permissions: ["geolocation"] }),
            testMatch: ["**/RideFlow.spec.ts"],
        },
    ],
    webServer: [
        {
            command: "npm run dev:test --prefix ../backend",
            // /health checks that Express AND the DB are ready before tests start.
            // Without this Playwright would start tests as soon as the port opens,
            // but before the DB connection is established.
            url: "http://localhost:3000/health",
            reuseExistingServer: !process.env.CI,
            // CI needs more time (Remote-DB + Cold Start)
            timeout: process.env.CI ? 60000 : 30000,
        },
        {
            command: "npm run dev",
            url: "http://localhost:5173",
            reuseExistingServer: !process.env.CI,
            timeout: 30000,
        },
    ],
});
