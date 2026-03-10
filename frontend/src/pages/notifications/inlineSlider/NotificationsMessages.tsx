import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import { clearAll } from "../../../../redux/slices/notificationsSlice"
import Message from "./Message";

/**
 * Notifications panel component that displays user notifications in a side sheet.
 * 
 * This component manages the notification sidebar, showing all user notifications
 * with visual indicators for unread messages. Users can mark messages as read,
 * delete individual notifications, or clear all notifications at once. The panel
 * opens from the right side and includes a bell icon with a red badge for unread messages.
 * 
 * @returns {JSX.Element} A sheet component containing the notifications list.
 */
export function NotificationsMessages() {

  const notifications = useSelector((state: RootState) => state.notificationsState.items);
  const dispatch = useDispatch<AppDispatch>();

  const hasUnread = useSelector(
    (state: RootState) => state.notificationsState.items.some(n => !n.read)
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="
    relative group
    p-2 rounded-full
    transition-all duration-200
    hover:bg-violet-100 dark:hover:bg-violet-900/30
  "
        >
          <Bell
            className=" w-5 h-5
      md:w-6 md:h-6
      transition-colors duration-200
      group-hover:text-violet-500
    "
          />

          {hasUnread && (
            <span className=" 
      absolute top-0 right-0
      w-3 h-3
      bg-red-500
      rounded-full
      border-2 border-white dark:border-black
    " />
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-full flex
       flex-col gap-0 p-0">
        {/* Header */}
        <div className="mt-4 flex items-center gap-4 px-4 py-4 divide-y
        border-b border-slate-200">
          <SheetClose asChild>
            <button className="flex flex-row items-center gap-6">
              <X className="h-4 w-4" />
              <span className="text-lg font-bold">Benachrichtigungen</span>
            </button>
          </SheetClose>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          {/* Messages */}
          {notifications.length > 0 ? (
            <div className={`flex-1 flex flex-col divide-y 
        ${hasUnread ? "divide-slate-700" : "divide-slate-200"} overflow-y-auto pb-24`}>

              {notifications.map((notification, index) => (
                <Message key={index} id={notification.id} icon={notification.icon}
                  title={notification.title} desc={notification.desc}
                  date={notification.date} read={notification.read}
                  color={notification.color}></Message>
              ))}

            </div>
          ) : <p className="h-full text-center mt-5">Leider gibt es noch keine Benachrichtigungen! Bald!</p>
          }

          {/* Clear notifications */}
          <div className="sticky bg-white dark:bg-sidebar bottom-0 px-6 flex justify-center border-t border-slate-200 py-6">
            <button className="w-full flex flex-row items-center py-3 px-4 justify-center
                                gap-4 rounded-xl border"
              onClick={() => dispatch(clearAll())}>
              <Trash2 className="w-5 h-5 -mt-1/2"></Trash2>
              <span className="text-sm font-bold">Alle Benachrichtigungen löschen</span>
            </button>
          </div>
        </div>



      </SheetContent>
    </Sheet>

  );
}
