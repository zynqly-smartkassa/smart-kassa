import { Keyboard } from "@capacitor/keyboard";
import { isMobile } from "./use-mobile";

export function resizeKeyboard() {
  if (isMobile) {
    Keyboard.addListener("keyboardWillShow", (info) => {
      window.scrollBy(0, info.keyboardHeight);
    });
    Keyboard.removeAllListeners();
  }
}
