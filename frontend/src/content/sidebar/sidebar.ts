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
        label: "Analysen",
        path: "/analytics",
        icon: BarChart,
      },
      {
        label: "Finanzen",
        path: "/finances",
        icon: Wallet,
      },
      {
        label: "Dokumentation",
        path: "/documentation",
        icon: BookOpen,
      },

    ],
  },

  {
    title: "Taxi Verwaltung",
    items: [
      {
        label: "Fahrt starten",
        path: "/ride",
        icon: Car,
        onlyMobile: true
      },
       {
        label: "Alle Fahrten",
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
    title: "Weitere",
    items: [
      {
        label: "Hilfe",
        path: "/help",
        icon: Info,
      },
      {
        label: "Einstellungen",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

