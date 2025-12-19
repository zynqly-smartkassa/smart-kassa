import { useSelector } from "react-redux";
import type { RootState } from "redux/store";

export const useNotificationCheck = (id: string): boolean => {
  const notifications = useSelector((state: RootState) => state.notificationsState.items);
  const notifications_archived = useSelector((state: RootState) => state.notificationsState.items_archived);

  return !notifications_archived.some(n => n.id === id) &&
         !notifications.some(n => n.id === id);
}
