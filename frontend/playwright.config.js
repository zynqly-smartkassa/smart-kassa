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
export default defineConfig({
    testDir: "./tests",
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
        {
            name: "chromium",
            use: __assign({}, devices["Desktop Chrome"]),
        },
        {
            name: "webkit",
            use: __assign({}, devices["Desktop Safari"]),
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
