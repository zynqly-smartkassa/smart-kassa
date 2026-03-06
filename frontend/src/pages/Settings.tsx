import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "../components/settings/Account";
import Notifications from "../components/settings/Notifications";
import UiStyling from "../components/settings/UiStyling";
import type { JSX } from "react";

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
const Settings = (): JSX.Element => {
  return (
    <Tabs defaultValue="account" className="w-full flex flex-col">
      <TabsList className="grid grid-cols-4 gap-3 w-full md:w-auto max-w-[400px]">
        <TabsTrigger className="col-span-1" value="account">
          Konto
        </TabsTrigger>
        <TabsTrigger className="col-span-2" value="notifications">
          Benachrichtigungen
        </TabsTrigger>
        <TabsTrigger className="col-span-1" value="ui-styling">
          Design
        </TabsTrigger>
      </TabsList>

      <div className="w-full mt-10">
        <TabsContent value="account">
          <Account></Account>
        </TabsContent>

        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>

        <TabsContent value="ui-styling">
          <UiStyling></UiStyling>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Settings;
