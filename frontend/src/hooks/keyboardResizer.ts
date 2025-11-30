import { Keyboard } from "@capacitor/keyboard";

export function resizeKeyboard() {
  Keyboard.addListener("keyboardWillShow", (info) => {
    window.scrollBy(0, info.keyboardHeight);
  });
  Keyboard.removeAllListeners();
}
