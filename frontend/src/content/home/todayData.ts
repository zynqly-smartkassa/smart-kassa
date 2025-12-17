export type TodayDataEntry = {
  date: string; // ISO string yyyy-mm-dd
  totalRevenue: number;
  totalRides: number;
  avgRideRevenue: number;
  totalKilometers: number;
  tips: number;
  niceHours: string[];
  avgRating: number;
};


export const todayData: TodayDataEntry = {
  
    date: "2025-11-22",
    totalRevenue: 312.50,
    totalRides: 14,
    avgRideRevenue: 22.32,
    totalKilometers: 105,
    tips: 34.8,
    niceHours: ["08:00–10:00", "16:00–18:00"],
    avgRating: 4.87,
 
};