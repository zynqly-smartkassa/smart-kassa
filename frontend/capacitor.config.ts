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
  },
};

export default config;
