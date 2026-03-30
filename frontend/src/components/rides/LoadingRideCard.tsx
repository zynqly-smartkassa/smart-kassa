import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Bar from "./Bar";

const LoadingRideCard = () => (
  <Card className="bg-sidebar">
    <CardHeader className="space-y-2">
      <CardTitle className="flex items-center gap-2">
        <span className="text-xl">🏁</span>
        <Bar className="h-5 w-40" />
      </CardTitle>
      <CardDescription className="flex gap-4">
        <span className="flex items-center gap-1">
          <Bar className="h-4 w-4" />
          <Bar className="h-4 w-16" />
        </span>
        <span className="flex items-center gap-1">
          <Bar className="h-4 w-4" />
          <Bar className="h-4 w-16" />
        </span>
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-3 text-sm">
      <div className="flex items-center gap-2">
        <Bar className="h-4 w-4 shrink-0" />
        <Bar className="h-4 w-48" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Bar className="h-4 w-4 shrink-0" />
          <Bar className="h-4 w-10" />
          <Bar className="h-4 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Bar className="h-4 w-4 shrink-0" />
          <Bar className="h-4 w-10" />
          <Bar className="h-4 w-36" />
        </div>
      </div>
    </CardContent>

    <CardFooter>
      <div className="flex items-center gap-2">
        <Bar className="h-4 w-4 shrink-0" />
        <Bar className="h-4 w-24" />
      </div>
    </CardFooter>
  </Card>
);

export default LoadingRideCard;
