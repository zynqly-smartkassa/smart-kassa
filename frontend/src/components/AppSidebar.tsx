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
} from "@/components/ui/sidebar";
import { sidebarSections } from "@/content/sidebar/sidebar";

import { Link } from "react-router-dom";

export function AppSidebar() {

  const {toggleSidebar} = useSidebar();

  return (
    <Sidebar className="hidden lg:flex w-full max-w-64 z-50">
      <SidebarHeader className="flex flex-row justify-between items-center">
        <Link to="/">
        <img src="/Logo.png" width={120} height={120}
        className="w-32 h-16 md:w-40 md:h-20"></img>
        </Link>
        
          <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>

      <SidebarContent>
        {sidebarSections.map((section, index) => (
           <SidebarGroup className="flex flex-col gap-2" key={index}>
          <SidebarGroupLabel className="text-xl">{section.title}</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="flex flex-col gap-3" onClick={() => toggleSidebar()}>

              {section.items.map((item, index) => (
                     <SidebarMenuItem key={index} className={`${item.onlyMobile ? "md:hidden" : ""}`}>
                <SidebarMenuButton> 
                  <Link to={item.path} className={`flex items-center gap-2`}>
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              ))}
            
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        ))}
       
      </SidebarContent>
    </Sidebar>
  );
}
