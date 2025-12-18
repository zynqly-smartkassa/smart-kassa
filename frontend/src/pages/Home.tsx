import { useSelector } from "react-redux";

import type { RootState } from "../../redux/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Balance from "../components/Balance";

export type RidesStats = {
  day: string;
  rides: number;
};

const ridesData: RidesStats[] = [
  { day: "Mon", rides: 42 },
  { day: "Tue", rides: 57 },
  { day: "Wed", rides: 31 },
  { day: "Thu", rides: 68 },
  { day: "Fri", rides: 75 },
  { day: "Sat", rides: 54 },
  { day: "Sun", rides: 39 },
];

export type DailyStats = {
  hour: string;
  rides: number;
};

const dailyRidesData: DailyStats[] = [
  { hour: "00:00", rides: 1 },
  { hour: "03:00", rides: 4 },
  { hour: "06:00", rides: 5 },
  { hour: "09:00", rides: 7 },
];

export type MonthlyWeekStats = {
  week: string;
  rides: number;
};

const monthlyWeekRidesData: MonthlyWeekStats[] = [
  { week: "Week 1", rides: 120 },
  { week: "Week 2", rides: 145 },
  { week: "Week 3", rides: 110 },
  { week: "Week 4", rides: 150 },
];

/**
 * Home component that displays the main dashboard with statistics and ride data.
 * 
 * This component provides a personalized welcome message and displays ride statistics
 * in different time periods (today, week, month) using tabs. Each tab shows a balance
 * chart with ride data for the selected period.
 * 
 * @returns {JSX.Element} The home dashboard with statistics and user greeting.
 */
function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {/* HEADER */}
      <Tabs defaultValue="today" className="w-full flex flex-col">
        {/* ABOVE TEXT LEFT + TABS LIST RIGHT) */}
        <div className="w-full flex flex-col gap-4 md:flex-row justify-between items-center md:items-end">
          <div className="flex flex-col">
            <h2 className="ml-2 text-lg text-center md:text-start font-light">
              Hi {user.firstName || "Thomas"},
            </h2>

            <div className="w-full flex items-center gap-2 text-3xl">
              <span>👋</span>
              <span className="font-bold">Welcome Back!</span>
            </div>
          </div>

          {/* TabsList stays on the right and aligned with the header */}
          <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-[400px]">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </div>

        {/* CONTENT SECTION – FULL WIDTH BELOW */}
        <div className="w-full mt-4">
          <TabsContent value="today">
            <Balance entry={dailyRidesData} duration="day" />
          </TabsContent>

          <TabsContent value="week">
            <Balance entry={ridesData} duration="week" />
          </TabsContent>

          <TabsContent value="month">
            <Balance entry={monthlyWeekRidesData} duration="month" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Home;
