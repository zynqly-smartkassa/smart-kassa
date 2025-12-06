
import { MapPin, Clock, Route, Timer, Bike, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AllRide } from "constants/AllRide";

interface RideAtDateArgs {
  rides: AllRide[];
}


  function formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${meters.toFixed(2)} m`;
    } else {
      const km = meters / 1000;
      return `${km.toFixed(2)} km`;
    }
  }

const RideAtDate = ({rides}: RideAtDateArgs) => {
  return (
    <ul className='w-full grid grid-cols-1 md:grid-cols-4 gap-4'>
        {rides && rides.map((ride, index) => (
          <li key={index} className='w-full'>
            {/*<Card onClick={() => navigator(`/all-rides/${ride.ride_id}`)}> */}
            <Card>
              <CardHeader className="space-y-1">
                {/* Start Address */}
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  {ride.start_address.split(",").slice(2, 4).join(", ")}
                </CardTitle>

                <CardDescription className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Route className="w-4 h-4" />
                    {formatDistance(ride.distance)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    {ride.duration}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>{ride.end_address.split(",").slice(0, 2).join(", ")}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">Start:</span>
                    {ride.start_time.replace('T', ' ').split(" ").join(" | ").slice(0, 21)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">Ende:</span>
                    {ride.end_time.replace('T', ' ').split(" ").join(" | ").slice(0, 21)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between text-sm">

                <div className="flex items-center gap-2 font-medium">
                  {ride.ride_type === "botenfahrt" ? (
                    <Bike className="w-4 h-4" />
                  ) : (
                    <Car className="w-4 h-4" />
                  )}
                  {ride.ride_type.charAt(0).toUpperCase() + ride.ride_type.slice(1)}
                </div>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
  )
}

export default RideAtDate
