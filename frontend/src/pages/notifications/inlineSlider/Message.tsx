import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import clsx from "clsx";

import type { NotificationsArgs } from "../../../../redux/slices/notificationsSlice"

import { Trophy, Flame, Frame, type LucideIcon, Leaf, Trash2, HandMetal } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { markAsRead, deleteNotification } from "../../../../redux/slices/notificationsSlice"
import { formatTimeAgo } from "@/utils/rides/summaryMinutes";

const iconMap = {
  trophy: Trophy,
  flame: Flame,
  frame: Frame,
  leaf: Leaf,
  handmetal: HandMetal
};

/**
 * Individual notification message card component.
 * 
 * Displays a single notification with an icon, title, description, and timestamp.
 * The message can be marked as read by clicking on it and deleted using the trash icon.
 * Unread messages are visually highlighted with a violet accent.
 * 
 * @param {NotificationsArgs} props - The notification properties.
 * @param {string} props.id - Unique identifier for the notification.
 * @param {string} props.icon - Icon name to display (trophy, flame, frame, leaf, handmetal).
 * @param {string} props.title - Notification title.
 * @param {string} props.desc - Notification description text.
 * @param {string} props.date - Date string in "YYYY-MM-DD HH:MM:SS" format.
 * @param {boolean} props.read - Whether the notification has been read.
 * @param {string} props.color - Color theme for the icon (amber, red, green, yellow, emerald).
 * @returns {JSX.Element} A card component displaying the notification message.
 */
const Message = ({ id, icon, title, desc, date, read, color }: NotificationsArgs) => {

  const dispatch = useDispatch<AppDispatch>();

  const Icon: LucideIcon = iconMap[icon as keyof typeof iconMap];
  return (
    <Card
      className={`
        relative border-0 rounded-none
        flex flex-row gap-4 items-center px-6 py-6
        transition-colors ${read ? "dark:bg-sidebar" : ""}
        ${!read ? "bg-violet-200" : ""}
      `}
      onClick={() => id && dispatch(markAsRead(id))}
    >
      {/* Accent Stripe */}
      {!read && (
        <div className="absolute left-0 top-0 h-full w-1 bg-violet-500" />
      )}

      {/* Icon */}
      <div
        className={clsx(
          "p-2 rounded-full",
          color === "amber"
            ? "bg-amber-500/10 text-amber-500"
            : color === "red"
              ? "bg-red-500/10 text-red-500"
              : color === "green"
                ? "bg-green-500/10 text-green-500"
                : color === "yellow" 
                  ? "bg-yellow-500/10 text-yellow-500"
                  : color === "emerald" 
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "" // fallback
        )}
      >
        <Icon className="w-6 h-6 stroke-current" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 flex-1">
        <CardHeader className="p-0">
          <CardTitle
            className={`
              font-bold text-base
              ${!read ? "text-violet-900" : ""}
            `}
          >
            {title}
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-1">
          <CardContent className={`p-0 text-base  leading-relaxed
          ${!read ? "text-slate-700  dark:text-slate-700" : "text-slate-600  dark:text-slate-400"}`}>
            {desc}
          </CardContent>

          <CardFooter className={`p-0 text-xs  font-extralight
          ${!read ? "text-slate-600 dark:text-slate-600" : "text-slate-500 dark:text-slate-500"}`}>

            {formatTimeAgo(date)}
          </CardFooter>
        </div>

      </div>

      <button onClick={() => id && dispatch(deleteNotification(id))}>
        <Trash2 className={`w-5 h-5 ${!read ? "text-slate-700  dark:text-slate-700" :
           "text-slate-600  dark:text-slate-400"}`} />
      </button>
    </Card>
  );
};

export default Message
