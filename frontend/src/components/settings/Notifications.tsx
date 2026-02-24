import SingleNotification from "./SingleNotification";

const Notifications = () => {
  return (
    <div className="settings-page-container">

      {/* Page Header */}
      <div className="page-header-container">
        <h2 className="page-title">Benachrichtigungseinstellungen</h2>
        <p className="subheader">
          Verwalten Sie Ihre Benachrichtigungen. Aktivieren oder deaktivieren Sie die Benachrichtigungen, die Sie erhalten möchten.
        </p>
      </div>

      {/* Email Notifications Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">E-Mail-Benachrichtigungen</h3>
          <p className="section-description">
            Erhalten Sie E-Mails, um zu erfahren, was passiert, wenn Sie nicht online sind. Sie können diese deaktivieren.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
        </div>
      </div>

      {/* Second Notification Section */}
      <div className="section-container">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="section-header">Weitere Benachrichtigungen</h3>
          <p className="section-description max-w-xs">
            Weitere Benachrichtigungseinstellungen
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <SingleNotification />
          <SingleNotification />
        </div>
      </div>

    </div>
  )
}

export default Notifications;
