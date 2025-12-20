import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { enableSetting, disableSetting, type NotificationSettingKey } from "../../../redux/slices/notificationsSlice";

interface SingleNotificationArgs {
  id: NotificationSettingKey;
  title: string;
  desc: string;
  startValue: boolean;
}

const SingleNotification = ({id, title, desc, startValue}: SingleNotificationArgs) => {

  const [enabled, setEnabled] = useState(startValue);

  console.log("Start value: ", startValue)

  const dispatch = useDispatch<AppDispatch>();

  function handleSetting() {
     if (!enabled) {
      dispatch(enableSetting(id));
      console.log("enabling")
    } else {
      dispatch(disableSetting(id));
       console.log("disabling")
    }
  }
   


  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => {setEnabled(!enabled); handleSetting()}}
      className="
              w-full flex items-center justify-between
              py-4 px-4 text-left rounded-xl
              transition-all
              hover:bg-gray-100
               dark:hover:bg-violet-700/30
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
  onCheckedChange={setEnabled}
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
    </Button>
  )
}

export default SingleNotification
