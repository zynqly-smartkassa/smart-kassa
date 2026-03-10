import {
  Home,
  BookOpen,
  Settings,
  Car,
  Receipt,
  List,
  Info,
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
        onlyMobile: true,
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
