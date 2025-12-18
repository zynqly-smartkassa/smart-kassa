import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

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
    process.env.NODE_ENV === "development"
      ? {
          url: "http://192.168.0.167:5173",
          cleartext: true,
        }
      : undefined,
};

export default config;
