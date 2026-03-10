import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { toggleSetting, type NotificationType } from "../../../redux/slices/notificationsSlice";

/**
 * Props interface for the SingleNotification component.
 * 
 * @template T - The notification section type (inlineSlider or emails).
 */
interface SingleNotificationArgs<T extends keyof NotificationType> {
  section: T;
  sectionKey: keyof NotificationType[T];
  title: string;
  desc: string;
  startValue: boolean;
}

/**
 * Individual notification setting toggle component.
 * 
 * Renders a single notification preference with a title, description, and toggle switch.
 * The component is fully interactive - users can click anywhere on the row to toggle the setting,
 * or use the switch directly. Changes are immediately dispatched to Redux state.
 * Includes hover effects and keyboard accessibility support.
 * 
 * @template T - The notification section type (inlineSlider or emails).
 * @param {SingleNotificationArgs<T>} props - The notification setting properties.
 * @param {T} props.section - The notification section category.
 * @param {keyof NotificationType[T]} props.sectionKey - The specific setting key within the section.
 * @param {string} props.title - Display title for the notification setting.
 * @param {string} props.desc - Description text explaining what the setting controls.
 * @param {boolean} props.startValue - Initial enabled/disabled state from Redux store.
 * @returns {JSX.Element} An interactive notification toggle row.
 */
const SingleNotification = <T extends keyof NotificationType>({ section, sectionKey, title, desc, startValue }: 
  SingleNotificationArgs<T>) => {

  const [enabled, setEnabled] = useState<boolean>(startValue);

  const dispatch = useDispatch<AppDispatch>();

  function handleSetting(enabled: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(toggleSetting({section, sectionKey, value: enabled} as any))
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        const value = !enabled
        setEnabled(value)
        handleSetting(value)
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          const value = !enabled
          setEnabled(value)
          handleSetting(value)
        }
      }}
      className="
    w-full flex items-center justify-between
    py-4 px-4 text-left rounded-xl
    transition-all
    hover:bg-gray-100
    dark:hover:bg-violet-700/30
    cursor-pointer
    focus:outline-none
    focus:ring-2 focus:ring-violet-400
  "
    >
  
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-500">
          {desc}
        </p>
      </div>
      
      <Switch
        checked={enabled}
        onCheckedChange={(value) => {
          setEnabled(value)
          handleSetting(value)
        }}
        onClick={(e) => e.stopPropagation()}
        className="
      scale-110
      bg-violet-200 dark:bg-slate-700          
      data-[state=checked]:bg-violet-400         
      data-[state=unchecked]:dark:bg-emerald-700/50  
      data-[state=checked]:before:translate-x-5
      before:bg-white
      before:transition-transform
      focus:ring-2 focus:ring-violet-400
    "
      />
    </div>

  )
}

export default SingleNotification
