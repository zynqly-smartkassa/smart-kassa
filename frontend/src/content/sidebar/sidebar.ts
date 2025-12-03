import { Home, BarChart, Wallet, BookOpen, Settings,
  Car, Receipt, List, UserSquare, Truck, CalendarClock,
  BadgePercent, Download, Info
 } from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  onlyMobile?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Navigation",
    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: Home,
      },
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart,
      },
      {
        label: "Finances",
        path: "/finances",
        icon: Wallet,
      },
      {
        label: "Docs",
        path: "/documentation",
        icon: BookOpen,
      },
      
    ],
  },

  {
    title: "Taxi Management",
    items: [
      {
        label: "Start a ride",
        path: "/ride",
        icon: Car,
        onlyMobile: true
      },
       {
        label: "All Rides",
        path: "/all-rides",
        icon: List,
      },
      {
        label: "Rechnungen",
        path: "/invoices",
        icon: Receipt,
      },
      {
        label: "Fahrer",
        path: "/drivers",
        icon: UserSquare,
      },
      {
        label: "Fahrzeuge",
        path: "/vehicles",
        icon: Truck,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        label: "Dienstplan",
        path: "/shift-plan",
        icon: CalendarClock,
      },
      {
        label: "Tarife",
        path: "/pricing",
        icon: BadgePercent,
      },

      {
        label: "Transfer",
        path: "/transfer",
        icon: Download,
      },
    ],
  },

   {
    title: "Utils",
    items: [
      {
        label: "Help",
        path: "/help",
        icon: Info,
      },
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

