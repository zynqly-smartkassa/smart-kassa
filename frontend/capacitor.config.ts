import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "org.Zynqly",
  appName: "Zynqly",
  webDir: "dist",
  //delete on production
  server: {
    url: "http://192.168.0.167:5173/",
    cleartext: true,
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true,
      resize: KeyboardResize.Native,
    },
  },
};

export default config;