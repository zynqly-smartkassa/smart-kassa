import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { useRef, useState } from "react";
import RideAtDate from "./RideAtDate";
import { ListFilter, ArrowUp, ArrowDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getRidesToday, getRidesYesterday } from "../../utils/rides/getRides";
import { useNavigate, useParams } from "react-router-dom";
import SummaryRide from "./SummaryRide";
import { useCheckForAchievements } from "../../hooks/userfeedback/useAchievements";
import InvoicesPagination from "@/components/Invoices/InvoicesPagination";
import { useGetAllRides } from "@/hooks/rides/useGetAllRides";

/**
 * Component that displays all rides for the logged-in user with filtering and sorting capabilities.
 *
 * This component provides a comprehensive view of all rides with the following features:
 * - Tab-based filtering to show rides from today, yesterday, or all time
 * - Sorting by date, distance, or duration in ascending or descending order
 * - Ride type filtering (all rides, botenfahrt only, or taxifahrt only)
 * - Individual ride summary view when accessed with a ride ID parameter
 * - Responsive design with mobile and desktop layouts
 *
 * The component fetches all rides on mount and provides an interactive UI for managing
 * and viewing ride history. If a ride ID is provided in the URL, it displays the detailed
 * summary for that specific ride instead of the list view.
 *
 * @returns {JSX.Element} The rides overview interface with filtering, sorting, and navigation options.
 */
const AllRides = () => {
  const [isDescending, setIsDescending] = useState(true);
  const [isAscending, setIsAscending] = useState(false);
  const [sortAfter, setSortAfter] = useState("date");
  const [rideType, setRideType] = useState("all");
  const [page, setPage] = useState(1);
  const tokenTracker = useRef(new Map<number, string>());
  const [token, setToken] = useState<string | undefined>(undefined);
  const { id } = useParams();
  const navigator = useNavigate();
  const { error, loading, rides, nextCursor } = useGetAllRides(token);

  const handlePrevious = () => {
    if (page > 1) {
      setToken(tokenTracker.current.get(page - 2) || undefined);
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (nextCursor) {
      if (tokenTracker.current.size === page - 1)
        tokenTracker.current.set(page, nextCursor);
      setToken(nextCursor);
      setPage((prev) => prev + 1);
    }
  };

  useCheckForAchievements(rides);

  const ride_id = Number(id);

  if (loading) {
    return <>Fahrten werden geladen...</>;
  }

  if (!rides) {
    return <>Leider gibt es noch keine Fahrten...</>;
  }

  if (error) {
    return <>Es gab einen unerwarteten Fehler</>;
  }

  // Test if all-rides was called with a id, if so find the exact route

  if (!loading && ride_id) {
    const ride = rides.find((r) => Number(r.ride_id) === ride_id);

    if (ride) {
      return <SummaryRide ride={ride}></SummaryRide>;
    } else {
      // since id was not found, navigate to main all-rides
      navigator("/all-rides");
    }
  }

  const ridesToday = getRidesToday(rides);
  const ridesYesterday = getRidesYesterday(rides);

  return (
    <div className="w-full flex flex-col gap-1 text-center md:text-left">
      <h2 data-testid="h2text" className="page-title">
        Fahrten
      </h2>

      <p className="subheader">
        Sehen und sortieren Sie jede Fahrt, die Sie unternommen haben!
      </p>

      {/* TabsList left */}
      <Tabs defaultValue="today" className="w-full flex flex-col gap-3 mt-3">
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full max-w-[400px] flex flex-col items-center gap-3">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="today" data-testid="show-today">
                Heute
              </TabsTrigger>
              <TabsTrigger value="yesterday" data-testid="show-yesterday">
                Gestern
              </TabsTrigger>
              <TabsTrigger value="all" data-testid="show-all">
                Alle
              </TabsTrigger>
            </TabsList>
            <div
              className="w-full md:w-auto flex flex-row justify-between
           items-center md:gap-6"
            >
              <div className="flex flex-row items-center gap-1">
                <Select
                  defaultValue="date"
                  onValueChange={(value) => setSortAfter(value)}
                >
                  <SelectTrigger
                    className={`max-w-[70px] px-1 border-2
                  border-gray-400/50`}
                    data-testid="select-filter-trigger"
                  >
                    <ListFilter></ListFilter>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="date"
                      className="md:text-lg"
                      data-testid="date"
                    >
                      Datum
                    </SelectItem>
                    <SelectItem
                      value="distance"
                      className="md:text-lg"
                      data-testid="distance"
                    >
                      Distanz
                    </SelectItem>

                    <SelectItem
                      value="duration"
                      className="md:text-lg"
                      data-testid="duration"
                    >
                      Dauer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <ArrowDown
                  className={`w-8 h-8 md:w-10 md:h-10
               ${isDescending ? "text-violet-400" : ""} `}
                  onClick={() => {
                    setIsDescending(!isDescending);
                    setIsAscending(!isAscending);
                  }}
                  data-testid="desc"
                ></ArrowDown>
                <ArrowUp
                  className={`w-8 h-8  md:w-10 md:h-10
              ${isAscending ? "text-violet-400" : ""} `}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setIsDescending(!isDescending);
                  }}
                  data-testid="asc"
                ></ArrowUp>
              </div>

              <Select
                defaultValue="all"
                onValueChange={(value) => setRideType(value)}
              >
                <SelectTrigger
                  className="w-[180px] border-2 
              border-violet-300 rounded-md md:text-lg"
                  data-testid="select-only-trigger"
                >
                  <SelectValue placeholder="Art der Fahrt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className="md:text-lg"
                    data-testid="only-all"
                  >
                    Alle
                  </SelectItem>
                  <SelectItem
                    value="botenfahrt"
                    className="md:text-lg"
                    data-testid="only-botenfahrt"
                  >
                    Botenfahrt
                  </SelectItem>
                  <SelectItem
                    value="taxifahrt"
                    className="md:text-lg"
                    data-testid="only-taxifahrt"
                  >
                    Taxifahrt
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* TabsContent right */}
        <div className="w-full">
          <TabsContent value="today">
            <RideAtDate
              rides={ridesToday}
              sortAfter={sortAfter}
              isDescending={isDescending}
              rideType={rideType}
            ></RideAtDate>
          </TabsContent>
          <TabsContent value="yesterday">
            <RideAtDate
              rides={ridesYesterday}
              sortAfter={sortAfter}
              isDescending={isDescending}
              rideType={rideType}
            ></RideAtDate>
          </TabsContent>
          <TabsContent value="all">
            <RideAtDate
              rides={rides}
              sortAfter={sortAfter}
              isDescending={isDescending}
              rideType={rideType}
            ></RideAtDate>
          </TabsContent>
        </div>
      </Tabs>

      <InvoicesPagination
        page={page}
        hasNext={!!nextCursor}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default AllRides;
