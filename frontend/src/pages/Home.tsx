import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import type { RootState } from "../../redux/store";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Balance from "../components/Home/Balance";
import type { JSX } from "react";
import {
  getDailyStats,
  getMonthlyStats,
  getWeeklyStats,
} from "../utils/dashboard";
import { useNavigate } from "react-router";

export type RidesStats = {
  day: string;
  rides: number;
};

export type DailyStats = {
  hour: string;
  rides: number;
};

export type MonthlyWeekStats = {
  week: string;
  rides: number;
};

/**
 * Home component that displays the main dashboard with statistics and ride data.
 *
 * This component provides a personalized welcome message and displays ride statistics
 * in different time periods (today, week, month) using tabs. Each tab shows a balance
 * chart with ride data for the selected period.
 *
 * @returns {JSX.Element} The home dashboard with statistics and user greeting.
 */
function Home(): JSX.Element {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  const [dailyData, setDailyData] = useState<DailyStats[]>([]);
  const [weeklyData, setWeeklyData] = useState<RidesStats[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyWeekStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [daily, weekly, monthly] = await Promise.all([
          getDailyStats(),
          getWeeklyStats(),
          getMonthlyStats(),
        ]);

        setDailyData(daily);
        setWeeklyData(weekly);
        setMonthlyData(monthly);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchData();
  }, [navigator]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {/* HEADER */}
      <Tabs defaultValue="today" className="w-full flex flex-col">
        {/* ABOVE TEXT LEFT + TABS LIST RIGHT) */}
        <div className="w-full flex flex-col gap-4 md:flex-row justify-between items-center md:items-end">
          <div className="flex flex-col">
            <h2 className="ml-2 text-lg text-center md:text-start font-light">
              Hello {user.firstName},
            </h2>

            <div className="w-full flex items-center gap-2 text-3xl">
              <span>👋</span>
              <span className="font-bold">Willkommen zurück!</span>
            </div>
          </div>

          {/* TabsList stays on the right and aligned with the header */}
          <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-[400px]">
            <TabsTrigger value="today">Heute</TabsTrigger>
            <TabsTrigger value="week">Woche</TabsTrigger>
            <TabsTrigger value="month">Monat</TabsTrigger>
          </TabsList>
        </div>

        {/* CONTENT SECTION – FULL WIDTH BELOW */}
        <div className="w-full mt-4">
          <TabsContent value="today">
            <Balance entry={dailyData} duration="day" />
          </TabsContent>

          <TabsContent value="week">
            <Balance entry={weeklyData} duration="week" />
          </TabsContent>

          <TabsContent value="month">
            <Balance entry={monthlyData} duration="month" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Home;
