import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch";
import { useState } from "react";



const SingleNotification = () => {

  const [enabled, setEnabled] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => setEnabled(!enabled)}
      className="
              w-full flex items-center justify-between
              py-4 px-4 text-left rounded-xl
              transition-all
              hover:bg-gray-100
               dark:hover:bg-violet-700/30
            "
    >
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm">News & Shout-OUTS</h3>
        <p className="text-xs text-gray-600 dark:text-gray-500">
          Receive news and Shout-OUTS xxxxxxxxxx
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
