import SingleNotification from "../SingleNotification";
import { NOTIFICATIONS } from "../../../../constants/Notifications"
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import type { JSX } from "react";

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
const Notifications = (): JSX.Element => {

  const notifications = useSelector((state: RootState) =>
    state.notificationsState.activeSettings)

  return (
    <div className="settings-page-container">

      {/* Page Header */}
      <div className="page-header-container">
        <h2 className="page-title break-words">Benachrichtigungseinstellungen</h2>
        <p className="subheader">
          Verwalten Sie Ihre Benachrichtigungen. Schalten Sie die Benachrichtigungen ein oder aus, die Sie erhalten möchten.
        </p>
      </div>

      {/* Email Notifications Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Zynqly-Benachrichtigungen</h3>
          <p className="section-description">
            Erhalten Sie Benachrichtigungen über neue Erfolge und neue Funktionen! Sie können diese deaktivieren.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification section={NOTIFICATIONS.INLINE_SLIDER.SECTION}
            sectionKey={NOTIFICATIONS.INLINE_SLIDER.ACHIEVEMENTS}
            title="Erfolge"
            desc="Erfolgs-Benachrichtigungen deaktivieren"
            startValue={notifications.inlineSlider.achievements} />
          <SingleNotification section={NOTIFICATIONS.INLINE_SLIDER.SECTION}
            sectionKey={NOTIFICATIONS.INLINE_SLIDER.NEWS}
            title="Neuigkeiten & Shout-OUTS"
            desc="Neuigkeiten und Shout-OUTS erhalten"
            startValue={notifications.inlineSlider.news} />

        </div>
      </div>

      {/* Second Notification Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">E-Mail-Benachrichtigungen</h3>
          <p className="section-description max-w-xs">
            Steuern Sie, welche Updates Sie per E-Mail erhalten!
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification section={NOTIFICATIONS.EMAIL.SECTION}
            sectionKey={NOTIFICATIONS.EMAIL.TWO_FACTOR}
            title="E-Mail-Benachrichtigungen"
            desc="E-Mails erhalten"
            startValue={notifications.emails.twoFactor} />
        </div>
      </div>

    </div>
  )
}

export default Notifications;
