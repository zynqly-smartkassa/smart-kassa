import SingleNotification from "./SingleNotification";
import {SETTINGS} from "../../../constants/Settings"
import type { NotificationSettingKey } from "../../../redux/slices/notificationsSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const Notifications = () => {

  const notifications = useSelector((state: RootState) => 
    state.notificationsState.activeSettings.notifications)
  console.log(notifications);

  return (
    <div className="settings-page-container">

      {/* Page Header */}
      <div className="page-header-container">
        <h2 className="page-title">Notification Settings</h2>
        <p className="subheader">
          Manage your notifications. Turn on or off the notifications you want to receive.
        </p>
      </div>

      {/* Email Notifications Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Email notifications</h3>
          <p className="section-description">
            Get emails to find out what's going on when you're not online. You can turn these off.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification id={SETTINGS.NOTIFICATIONS_ACHIEVEMENTS as NotificationSettingKey} 
          title="Achievements" 
          desc="Turn off achievements settings"
          startValue={notifications.achievements} />
           <SingleNotification id={SETTINGS.NOTIFICATIONS_NEWS as NotificationSettingKey} 
           title="News & Shout-OUTS" 
           desc="Receive news and Shout-OUTS"
          startValue={notifications.news} />
          
        </div>
      </div>

      {/* Second Notification Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Second Notification Section</h3>
          <p className="section-description max-w-xs">
            Set some notifications
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
       
        </div>
      </div>

    </div>
  )
}

export default Notifications;
