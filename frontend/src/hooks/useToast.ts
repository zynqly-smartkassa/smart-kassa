import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { AppDispatch } from "../../redux/store";
import { ToastWarningShowed } from "../../redux/slices/toastSlice";

/**
 * Toast to show the User that he has to log in to use the App
 * @param showToast The Boolean Value to show the Toast or not (used to controll when to show the toast)
 * @param message The Message in the Toast
 * @param resetAction The Dispatcher to globaly set the showToast Value to false
 * @author Casper Zielinski
 */
export function useWarningToast(
  showToast: boolean,
  message: string,
  resetAction: AppDispatch
) {
  const toastShownRef = useRef(true);

  useEffect(() => {
    if (showToast && toastShownRef.current) {
      toast(message, {
        position: "top-center",
        closeButton: true,
        duration: 3000,
        className: "mt-5 md:mt-0",
      });
      toastShownRef.current = false;
      resetAction(ToastWarningShowed());
    }
  }, [showToast, message, resetAction]);
}
