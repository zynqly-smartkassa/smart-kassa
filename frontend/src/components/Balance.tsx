import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
  RadialBarChart,
  RadialBar,
  LabelList,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import type { DailyStats, MonthlyWeekStats, RidesStats } from "../pages/Home";
import { barChartConfig, radialSeriesConfig, chartKeys, type Duration } from "../content/balance/config";
import { metrics, type Metric, chartData, driverShare, brutto, netto } from "../content/balance/data";

// configs & data moved to content/balance/*

interface BalanceData {
  duration: Duration;
  entry?: RidesStats[] | DailyStats[] | MonthlyWeekStats[]
}

const Balance = ({ entry, duration }: BalanceData) => {


  const xKey = chartKeys[duration];

  return (
    <div className="w-full flex flex-col gap-4">

      <div className="w-full">

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 w-full">
          {metrics.map((data: Metric, index: number) => (
            <Card
              key={index}
              className="w-full rounded-xl border border-border/40 bg-sidebar
               shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row justify-between
              items-center">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {data.label}
                  </CardTitle>
                </div>

                <data.icon className="w-5 h-5 pb-[5px] text-muted-foreground" />
              </CardHeader>

              <CardContent className="flex flex-col gap-1">
                <span className="text-2xl font-bold tracking-tight">
                  {data.value}
                </span>

                <span className="text-xs text-muted-foreground font-light">
                  +25.1% last month
                </span>
              </CardContent>
            </Card>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="w-full lg:col-span-1 rounded-xl border border-border/40 bg-sidebar
               shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl">Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={radialSeriesConfig}
              className="mx-auto aspect-square max-h-[250px]"

            >
              <RadialBarChart
                data={chartData}
                startAngle={180}
                endAngle={-180}
                innerRadius="30%"
                outerRadius="80%"

              >
                <RadialBar
                  dataKey="value"
                  background
                  isAnimationActive={true}
                >
                  <LabelList
                    dataKey="name"
                    position="insideStart"
                    className="fill-white capitalize mix-blend-luminosity"
                    fontSize={11}
                  />
                </RadialBar>

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="name" />}
                />

              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="space-y-4 text-center
          flex flex-col items-center">

            <div>
              <p className="text-sm text-muted-foreground mb-1">Dein Anteil</p>
              <p className="text-4xl font-bold text-green-500">€ {driverShare}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-lg bg-violet-50 dark:bg-violet-950 p-3">
                <p className="text-xs text-muted-foreground mb-1">Brutto</p>
                <p className="text-lg font-semibold text-violet-600 dark:text-violet-400">€ {brutto}</p>
              </div>
              <div className="rounded-lg bg-pink-50 dark:bg-pink-950 p-3">
                <p className="text-xs text-muted-foreground mb-1">Netto</p>
                <p className="text-lg font-semibold text-pink-600 dark:text-pink-400">€ {netto}</p>
              </div>
            </div>


          </CardFooter>
        </Card>

        <Card className="w-full lg:col-span-2 rounded-xl border border-border/40 bg-sidebar
               shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl">Overview</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center justify-center">
            {/* Bar Chart */}
            <ChartContainer
              config={barChartConfig}
              className="w-full h-[200px] md:h-[300px] lg:h-[400px]"
            >
              <BarChart accessibilityLayer data={entry}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  width={28}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  dataKey="rides"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="rides" fill="#8b5cf6" radius={8} barSize={20} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

    </div>

  )
}

export default Balance
