import { Car, Euro, CreditCard, FileKey } from "lucide-react";

export type Metric = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const metrics: Metric[] = [
  { label: "Fahrten", value: "25", icon: Car },
  { label: "Ø / Fahrt", value: "3,5€", icon: FileKey },
  { label: "Kartenzahlungen", value: "10", icon: CreditCard },
  { label: "Barzahlungen", value: "15", icon: Euro },
];

export type BalanceChart = {
  key: "brutto" | "netto" | "anteilFahrer";
  name: string;
  value: number;
  fill: string;
};

export const chartData: BalanceChart[] = [
  {
    key: "brutto",
    name: "Brutto Umsatz",
    value: 3764,
    fill: "#8b5cf6",
  },
  {
    key: "netto",
    name: "Netto Umsatz",
    value: 1800,
    fill: "#f472b6",
  },
  {
    key: "anteilFahrer",
    name: "Anteil Fahrer",
    value: 650,
    fill: "#22c55e",
  },
];

export const driverShare = 650;
export const brutto = 3764;
export const netto = 1800;
