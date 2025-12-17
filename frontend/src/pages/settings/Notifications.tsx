import SingleNotification from "./SingleNotification";

const Notifications = () => {
  return (
    <div className="flex flex-col gap-16">

      {/* Page Header */}
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-3xl font-extrabold">Notification Settings</h2>
        <p className="text-base text-gray-600 dark:text-gray-500 mt-2">
          Manage your notifications. Turn on or off the notifications you want to receive.
        </p>
      </div>

      {/* Email Notifications Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start border-b border-gray-300 pb-10">
        
        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="font-extrabold text-lg">Email notifications</h3>
          <p className="text-sm font-light mt-1">
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
      <div className="flex flex-col md:flex-row gap-10 items-start border-b border-gray-300 pb-10">
        
        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="font-extrabold text-lg">Second Notification Section</h3>
          <p className="text-sm font-light mt-1 max-w-xs">
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
