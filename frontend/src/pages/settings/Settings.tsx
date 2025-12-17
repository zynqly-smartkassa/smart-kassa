
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./Account"
import Notifications from "./Notifications"
import UiStyling from "./UiStyling"

const Settings = () => {

  return (
    <Tabs defaultValue="account" className="w-full flex flex-col">

      <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-[400px]">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="ui-styling">UI-Styling</TabsTrigger>
   
      </TabsList>

      <div className="w-full mt-10">
        <TabsContent value="account">
          <Account></Account>
        </TabsContent>

        <TabsContent value="notifications">
          <Notifications/>
        </TabsContent>

        <TabsContent value="ui-styling">
          <UiStyling></UiStyling>
        </TabsContent>
      </div>

    </Tabs>

  )
}

export default Settings
