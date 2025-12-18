
import { MapPinPlus, Clock, Route, Timer, Bike, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import type { AllRide } from "constants/AllRide";
import { date, distance, duration } from "../../utils/rides/sort";
import { useNavigate } from "react-router-dom";

/**
 * Args for the RideAtDate component.
 * 
 * @property {AllRide[]} rides - Array of rides to display.
 * @property {string} sortAfter - The field to sort by (date, distance, or duration).
 * @property {boolean} isDescending - Whether to sort in descending order.
 * @property {string} rideType - The type of rides to filter (all, botenfahrt, or taxifahrt).
 */
interface RideAtDateArgs {
  rides: AllRide[];
  sortAfter: string
  isDescending: boolean,
  rideType: string
}

/**
 * Formats a distance value in meters to a human-readable string.
 * 
 * @param {number} meters - The distance in meters to format.
 * @returns {string} Formatted distance string with unit (m or km).
 */
function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters.toFixed(2)} m`;
  } else {
    const km = meters / 1000;
    return `${km.toFixed(2)} km`;
  }
}

/**
 * Sorts the rides array based on the specified field and order.
 * 
 * @param {AllRide[]} rides - The array of rides to sort (modified in place).
 * @param {string} sortAfter - The field to sort by (date, distance, or duration).
 * @param {boolean} isDescending - Whether to sort in descending order.
 */
function handleSort(rides: AllRide[], sortAfter: string, isDescending: boolean
) {
  switch (sortAfter) {
    case "date":
      date(rides, isDescending);
      break;
    case "distance":
      distance(rides, isDescending);
      break;
    case "duration":
      duration(rides, isDescending);
      break;
    default:
      break;
  }
}

/**
 * Filters rides by type.
 * 
 * @param {AllRide[]} rides - The array of rides to filter.
 * @param {string} rideType - The type to filter by (botenfahrt, taxifahrt, or all).
 * @returns {AllRide[]} Filtered array of rides.
 */
function handleRideType(rides: AllRide[], rideType: string) {

  if (rideType === "botenfahrt") {
    return rides.filter((element) => element.ride_type === "botenfahrt")
  } else if (rideType === "taxifahrt") {
    return rides.filter((element) => element.ride_type === "taxifahrt")
  }

  return rides;
}

/**
 * Component that displays a grid of ride cards with filtering and sorting capabilities.
 * 
 * This component renders ride information in a responsive card grid layout. Each card shows
 * key ride details including destination, distance, duration, start/end addresses and times,
 * and ride type. Cards are clickable and navigate to the detailed ride summary.
 * 
 * @param {RideAtDateArgs} args - The args containing rides data and display preferences.
 * @returns {JSX.Element} A grid of ride cards or a message if no rides are available.
 */
const RideAtDate = ({ rides, sortAfter, isDescending, rideType }: RideAtDateArgs) => {

  const navigator = useNavigate();

  if (rides.length === 0) {
    return <>There are no rides for this date...</>
  }

  const filteredRides = handleRideType(rides, rideType);
  handleSort(filteredRides, sortAfter, isDescending);

  return (
    <ul className='w-full grid grid-cols-1 md:grid-cols-2
     xl:grid-cols-3 gap-4 2xl:grid-cols-4 3xl:grid-cols-5'>
      {filteredRides && filteredRides.map((ride, index) => (
        <li data-testid="ride-item" data-ride={JSON.stringify(ride)}
          key={index} className='w-full'>
          <Card onClick={() => navigator(`/all-rides/${ride.ride_id}`)}
            data-testid={`ride-item-${ride.ride_id}`}
            className="bg-sidebar transition-all duration-200 ease-out
                        hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <CardHeader className="space-y-1">
              {/* Start Address */}
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-xl">🏁</span> 
                {ride.end_address.split(",").slice(2, 4).join(", ")}
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

                <MapPinPlus className="w-4 h-4 text-indigo-600" />
                <span>{ride.start_address.split(",").slice(0, 2).join(", ")}</span>
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


