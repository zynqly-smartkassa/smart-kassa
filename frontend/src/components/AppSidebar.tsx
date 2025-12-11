import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "../components/ui/sidebar";
import { sidebarSections } from "@/content/sidebar/sidebar";
import { Capacitor } from "@capacitor/core";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export function AppSidebar() {
  // to close the Side Bar when a menu item is clicked
  const { toggleSidebar } = useSidebar();

  const [isMd, setIsMd] = useState(false);
  const mdBreakpoint = 768;
  const isMobile = Capacitor.isNativePlatform();

  /**
   * Important to not close Side Bar on Desktop
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= mdBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialen Zustand setzen

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Closes Sidebar when Menu Item is clicked (only on Mobile)
   */
  function closeSideBar() {
    if (!isMd) {
      toggleSidebar();
    }
  }

  return (
    <Sidebar className="hidden lg:flex w-full max-w-64 z-50">
      <SidebarHeader className="flex pt-10 md:pt-5 flex-row justify-between items-center">
        <Link to="/" onClick={() => closeSideBar()}>
          <img
            src="/Logo.png"
            width={120}
            height={120}
            className="w-32 h-16 md:w-40 md:h-20"
          ></img>
        </Link>

        <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>

      <SidebarContent>
        {sidebarSections.map((section, index) => (
          <SidebarGroup className="flex flex-col gap-2" key={index}>
            <SidebarGroupLabel className="text-xl">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu
                className="flex flex-col gap-3"
                onClick={() => closeSideBar()}
              >
                {section.items.map(
                  (item, index) =>
                    (isMobile || !item.onlyMobile) && (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton>
                          <Link
                            to={item.path}
                            className="flex items-center gap-2 w-full"
                          >
                            <item.icon className="w-6 h-6" />
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
