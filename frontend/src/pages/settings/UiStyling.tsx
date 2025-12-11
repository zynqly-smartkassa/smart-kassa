import ModeSwitcherUi from "@/components/ui/mode-switcher.ui"


const UiStyling = () => {
  return (
    <div className="flex flex-col gap-16">

      {/* Page Header */}
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-3xl font-extrabold">UI Settings</h2>
        <p className="text-base text-gray-600 dark:text-gray-500 mt-2">
          Manage your style. Colors, System, etc..
        </p>
      </div>

      {/* Email Notifications Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start border-b border-gray-300 pb-10">

        {/* Left Label Column */}
        <div className="w-full md:w-64">
          <h3 className="font-extrabold text-lg">UI-Theme</h3>
          <p className="text-sm font-light mt-1">
            How the website will look like!
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <ModeSwitcherUi></ModeSwitcherUi>
        </div>
      </div>

    </div>
  )
}

export default UiStyling
