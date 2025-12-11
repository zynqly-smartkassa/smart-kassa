import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";

export function resizeKeyboard() {
  const isCapacitor = Capacitor.isNativePlatform();

  if (isCapacitor) {
    Keyboard.addListener("keyboardWillShow", (info) => {
      window.scrollBy(0, info.keyboardHeight);
    });
    Keyboard.removeAllListeners();
  }
}
