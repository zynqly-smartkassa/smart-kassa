
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "./Account"
import Notifications from "../notifications/inlineSlider/Notifications"
import UiStyling from "./UiStyling"

/**
 * Main settings page component with tabbed navigation.
 * 
 * Serves as the container for all user settings, organizing them into three main categories:
 * - Account: Profile information, avatar, and account management
 * - Notifications: Notification preferences and settings
 * - UI-Styling: Theme and visual customization options
 * 
 * The component uses a tab interface for easy navigation between different settings sections.
 * 
 * @returns {JSX.Element} A tabbed settings interface with three main sections.
 */
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
