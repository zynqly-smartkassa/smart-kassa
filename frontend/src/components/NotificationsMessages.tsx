import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, X, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "redux/store";
import Message from "./Message";

export function NotificationsMessages() {

  const notifications = useSelector((state: RootState) => state.notificationsState.items);
  console.log("Notifications:", notifications)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Bell className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-full flex
       flex-col gap-0 p-0">
        {/* Header */}
        <div className="mt-3 flex items-center gap-4 px-4 py-4 divide-y
        border-b border-slate-200">
          <SheetClose asChild>
            <button className="flex flex-row items-center gap-6">
              <X className="h-4 w-4" />
              <span className="text-lg font-bold">Notifications</span>
            </button>
          </SheetClose>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          {notifications.length > 0 ? (
            <div className="flex-1 flex flex-col divide-y 
        divide-slate-200 overflow-y-auto pb-10">

              {notifications.map((notification, index) => (
                <Message key={index} id={notification.id} icon={notification.icon}
                  title={notification.title} desc={notification.desc}
                  date={notification.date} read={notification.read}
                  color={notification.color}></Message>
              ))}

            </div>
          ) : <p className="h-full text-center">Unfortunately there are no notifications yet! Soon!</p>
          }


          {/* Clear notifications */}
          <div className="sticky bottom-0 px-6 flex justify-center border-t border-slate-200 py-6">
            <button className="w-full flex flex-row items-center py-3 px-4 justify-center
        gap-4 rounded-xl border">
              <Trash2 className="w-5 h-5 -mt-1/2"></Trash2>
              <span className="text-sm font-bold">Clear all notifications</span>
            </button>
          </div>
        </div>
        {/* Messages */}


      </SheetContent>
    </Sheet>

  );
}
