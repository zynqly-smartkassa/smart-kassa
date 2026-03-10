/// <reference types="node" />
import type { CapacitorConfig } from "@capacitor/cli";
import { config as dotenvConfig } from "dotenv";
import { KeyboardResize } from "@capacitor/keyboard";

// Load .env.local file
dotenvConfig({ path: ".env.local" });

const config: CapacitorConfig = {
  appId: "org.Zynqly",
  appName: "Zynqly",
  webDir: "dist",
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true,
      resize: KeyboardResize.Native,
    },
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: { enabled: true },
  },
  server:
    process.env.MOBILE_REFRESH === "true"
      ? {
          url: process.env.LOCAL_URL || "http://192.168.0.167:5173",
          cleartext: true,
        }
      : undefined,
};

export default config;
