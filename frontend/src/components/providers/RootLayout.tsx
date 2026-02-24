import { Link, Outlet, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/AppSidebar";

import SearchInput from "@/components/inputs/SearchInput";
import { isMobile } from "@/hooks/layout/use-mobile";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLink } from "../../../redux/slices/footerLinksSlice";
import { NotificationsMessages } from "../../pages/notifications/inlineSlider/NotificationsMessages";
import { fetchAvatar } from "@/utils/getAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAvatarState } from "../../../redux/slices/avatarSlice";

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
export default function RootLayout(): JSX.Element {
  // to know which path is active for the underline in the footer
  const [active, setActive] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const footerLinksIndex = useSelector(
    (state: RootState) => state.setFooterLink.linkIndex,
  );
  const avatarState = useSelector((state: RootState) => state.avatarState.url);
  const getAvatar = (): string | null => {
    if ((!avatarState && !avatar) || errorAvatar) {
      return null;
    }

    return !avatarState || avatarState === "" ? avatar : avatarState;
  };
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
    fetchAvatar(true, setLoadingAvatar, setAvatar, setErrorAvatar, dispatch);
    dispatch(setLink(1));
    dispatch(setAvatarState(avatar));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarState]);

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
        px-4 z-40 space-x-3"
          >
            <SidebarTrigger className="lg:hidden" />

            <SearchInput></SearchInput>

            {/* Account icon and Bell on the right side */}

            <div className="flex flex-row gap-4 items-center text-lg flex-shrink">
              <NotificationsMessages></NotificationsMessages>
              <Avatar
                onClick={() => {
                  navigator("/settings");
                  dispatch(setLink(2));
                }}
                className="cursor-pointer"
              >
                <AvatarImage
                  src={
                    getAvatar() ||
                    "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                  }
                  alt="Profilbild"
                  className="rounded-full object-fill"
                />
                <AvatarFallback>
                  <User className={loadingAvatar ? "" : "animate-pulse"} />
                </AvatarFallback>
              </Avatar>
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
