import SingleNotification from "../SingleNotification";
import { NOTIFICATIONS } from "../../../../constants/Notifications"
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

/**
 * Notification settings page component.
 * 
 * Displays a settings interface for managing notification preferences across different categories.
 * Users can toggle inline slider notifications (achievements, news) and email notifications
 * (two-factor authentication). The component reads the current notification settings from Redux
 * state and allows users to customize their notification experience.
 * 
 * @returns {JSX.Element} A settings page with notification toggle controls.
 */
const Notifications = () => {

  const notifications = useSelector((state: RootState) =>
    state.notificationsState.activeSettings)

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
          <h3 className="section-header">Zynqly notifications</h3>
          <p className="section-description">
            Get notifications to get information about new achievements and new features! You can turn these off.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification section={NOTIFICATIONS.INLINE_SLIDER.SECTION}
            sectionKey={NOTIFICATIONS.INLINE_SLIDER.ACHIEVEMENTS}
            title="Achievements"
            desc="Turn off achievements settings"
            startValue={notifications.inlineSlider.achievements} />
          <SingleNotification section={NOTIFICATIONS.INLINE_SLIDER.SECTION}
            sectionKey={NOTIFICATIONS.INLINE_SLIDER.NEWS}
            title="News & Shout-OUTS"
            desc="Receive news and Shout-OUTS"
            startValue={notifications.inlineSlider.news} />

        </div>
      </div>

      {/* Second Notification Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Email Notifications</h3>
          <p className="section-description max-w-xs">
            Control which updates you receive via email!
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification section={NOTIFICATIONS.EMAIL.SECTION}
            sectionKey={NOTIFICATIONS.EMAIL.TWO_FACTOR}
            title="Email notifications"
            desc="Receive emails"
            startValue={notifications.emails.twoFactor} />
        </div>
      </div>

    </div>
  )
}

export default Notifications;
