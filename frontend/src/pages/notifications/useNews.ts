import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { addNotification } from "../../../redux/slices/notificationsSlice";
import { NEWS } from "../../../constants/Notifications";
import { getDateNow } from "@/utils/rides/getDate";
import { useNotificationCheck } from "@/hooks/useNotificationCheck";
import { useEffect } from "react";

/**
 * Custom hook for checking and dispatching news and announcement notifications.
 * 
 * Monitors a trigger condition to detect when news notifications should be sent.
 * Currently handles the welcome notification when a user successfully registers.
 * The hook respects the user's notification preferences for news and only sends
 * notifications if the news setting is enabled. It also prevents duplicate notifications
 * by checking if a news notification has already been sent.
 * 
 * @param {boolean} trigger - Boolean flag indicating when to check for news notifications (typically on user registration).
 * @returns {void} This hook does not return a value; it dispatches notifications as side effects.
 */
export const useCheckForNews = (trigger: boolean) => {
  const dispatch = useDispatch<AppDispatch>();

  const inlineSlider = useSelector((state: RootState) =>
    state.notificationsState.activeSettings.inlineSlider);

  const hasNotSendRegister = useNotificationCheck(NEWS.REGISTER);

  useEffect(() => {
    
    if (!inlineSlider.news) return;
  
    if (!trigger) return;

    if (hasNotSendRegister) {
      dispatch(addNotification({
        id: NEWS.REGISTER,
        icon: "handmetal",
        title: "Welcome! 🧏‍♂️",
        desc: "You successfully created an account!",
        date: getDateNow(),
        read: false,
        color: "emerald"
      }))
    }
  }, [inlineSlider, trigger, hasNotSendRegister, dispatch])

} 