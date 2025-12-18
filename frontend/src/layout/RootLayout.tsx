import { Link, Outlet } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import { Bell } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { isMobile } from "@/hooks/use-mobile";
import type { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLink } from "../../redux/slices/footerLinksSlice";

interface IfooterLinks {
  name: string;
  path: string;
  onWeb?: {
    isOnWeb: boolean;
    name: string;
    path: string;
  };
}

/**
 * Root layout component that provides the main application structure and navigation.
 * 
 * This component serves as the main layout wrapper for all pages, providing:
 * - Responsive sidebar navigation with automatic behavior on desktop/mobile
 * - Header with search functionality, notifications, and user account access
 * - Footer navigation for mobile devices with dynamic links based on screen size
 * - Main content area where child routes are rendered via Outlet
 * 
 * The layout adapts between desktop (sidebar always visible) and mobile (collapsible sidebar
 * with bottom navigation) automatically based on screen size.
 * 
 * @returns {JSX.Element} The root layout with sidebar, header, footer, and content area.
 */
export default function RootLayout() {
  // to know which path is active for the underline in the footer
  const [active, setActive] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const footerLinksIndex = useSelector(
    (state: RootState) => state.setFooterLink.linkIndex
  );
  const footerLinks: IfooterLinks[] = [
    {
      name: "Start Ride",
      path: "/ride",
      onWeb: { isOnWeb: !isMobile, name: "Statistics", path: "/" },
    },
    { name: "Home", path: "/" },
    { name: "Account", path: "/settings" },
  ];

  useEffect(() => {
    dispatch(setLink(isMobile ? 0 : 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const handler = () => {
      // wenn large screen → sidebar immer öffnen
      if (mq.matches) {
        setActive(true);
      }
    };

    // initial
    handler();
    // listener
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <SidebarProvider open={active} onOpenChange={setActive}>
      <div
        className="flex flex-col lg:flex-row gap-4 w-full min-h-[100dvh] pt-5 pb-20 md:pb-4
      bg-gray-400/20 md:pt-2"
      >
        {/* Content in Sidebar */}
        <AppSidebar />

        <div className="flex flex-col w-full">
          <header
            className="
        h-16 backdrop-blur-md
        border-b border-zinc-300 dark:border-zinc-800 md:border-none
        flex items-center justify-between
        px-4 z-40"
          >
            <SidebarTrigger className="lg:hidden" />

            <SearchInput></SearchInput>

            {/* Account icon and Bell on the right side */}

            <div className="flex flex-row gap-4 items-center text-lg flex-shrink">
              <Bell className="hidden md:block md:w-6 md:h-6"></Bell>
              <CircleUser className="w-6 h-6 md:w-10 md:h-10"></CircleUser>
            </div>
          </header>

          {/* The RootLayout will automatically inject the current Page */}
          <main className="flex pt-4 px-4">
            <Outlet />
          </main>

          <footer
            className="
    h-16 w-full
    backdrop-blur-md bg-white/60 dark:bg-black/40
    border-t border-zinc-300 dark:border-zinc-800
    px-4
    fixed bottom-0 left-0 md:hidden z-[41]
  "
          >
            <nav className="grid grid-cols-3 h-full place-items-center text-sm font-medium">
              {footerLinks.map((element, index) => {
                // Use onWeb values if on web, otherwise use default values
                const isOnWeb = !isMobile && element.onWeb?.isOnWeb;
                const displayName = isOnWeb
                  ? element.onWeb!.name
                  : element.name;
                const displayPath = isOnWeb
                  ? element.onWeb!.path
                  : element.path;

                return (
                  <Link
                    key={index}
                    className={`
            hover:text-violet-500 relative px-2 py-1
            ${
              // underline color
              index === footerLinksIndex
                ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-violet-500 after:transition-all after:duration-300"
                : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-transparent after:transition-all after:duration-300"
            }
          `}
                    to={displayPath}
                    onClick={() => dispatch(setLink(index))}
                  >
                    {displayName}
                  </Link>
                );
              })}
            </nav>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
