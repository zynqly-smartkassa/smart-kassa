import type { ChartConfig } from "@/components/ui/chart";

// Bar chart config (rides axis labels)
export const barChartConfig = {
  rides: {
    label: "Rides",
  },
} as const;

// Radial chart series colors and labels
export const radialSeriesConfig = {
  brutto: {
    label: "Brutto Umsatz",
    color: "#8b5cf6",
  },
  netto: {
    label: "Netto Umsatz",
    color: "#f472b6",
  },
  anteilFahrer: {
    label: "Anteil Fahrer",
    color: "#22c55e",
  },
} satisfies ChartConfig;

// X-axis keys based on duration
export const chartKeys = {
  day: "hour",
  week: "day",
  month: "week",
} as const;
export type Duration = keyof typeof chartKeys;
