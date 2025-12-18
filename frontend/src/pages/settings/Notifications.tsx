import SingleNotification from "./SingleNotification";

const Notifications = () => {
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
          <h3 className="section-header">Second Notification Section</h3>
          <p className="section-description max-w-xs">
            Set some notifications
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
