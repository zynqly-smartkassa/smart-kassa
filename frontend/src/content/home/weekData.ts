export type WeekDataEntry = {
  day: string;
  date: string; // ISO string yyyy-mm-dd
  totalRevenue: number;
  totalRides: number;
  totalKilometers: number;
  tips: number;
  avgRating: number;
};

export const weekData: WeekDataEntry[] = [
  {
    day: "Monday",
    date: "2025-11-17",
    totalRevenue: 280.40,
    totalRides: 13,
    totalKilometers: 95,
    tips: 22.10,
    avgRating: 4.78,
  },
  {
    day: "Tuesday",
    date: "2025-11-18",
    totalRevenue: 340.00,
    totalRides: 15,
    totalKilometers: 108,
    tips: 31.50,
    avgRating: 4.82,
  },
  {
    day: "Wednesday",
    date: "2025-11-19",
    totalRevenue: 298.75,
    totalRides: 12,
    totalKilometers: 86,
    tips: 19.40,
    avgRating: 4.75,
  },
  {
    day: "Thursday",
    date: "2025-11-20",
    totalRevenue: 355.30,
    totalRides: 16,
    totalKilometers: 114,
    tips: 26.20,
    avgRating: 4.80,
  },
  {
    day: "Friday",
    date: "2025-11-21",
    totalRevenue: 420.10,
    totalRides: 19,
    totalKilometers: 132,
    tips: 44.00,
    avgRating: 4.91,
  },
  {
    day: "Saturday",
    date: "2025-11-22",
    totalRevenue: 510.40,
    totalRides: 24,
    totalKilometers: 150,
    tips: 52.40,
    avgRating: 4.96,
  },
  {
    day: "Sunday",
    date: "2025-11-23",
    totalRevenue: 265.00,
    totalRides: 11,
    totalKilometers: 78,
    tips: 17.20,
    avgRating: 4.73,
  },
];
