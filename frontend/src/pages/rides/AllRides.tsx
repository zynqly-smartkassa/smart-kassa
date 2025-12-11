
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import { getAllRides } from "../../utils/rides/all-rides";
import { useEffect, useState } from "react";
import type { AllRide } from 'constants/AllRide';
import RideAtDate from "./RideAtDate";
import { ListFilter, ArrowUp, ArrowDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import { getRidesToday, getRidesYesterday } from "../../utils/rides/getRides";
import { SelectValue } from "@radix-ui/react-select";
import { useParams } from "react-router-dom";
import SummaryRide from "./SummaryRide";

const AllRides = () => {

  const [isDescending, setIsDescending] = useState(true);
  const [isAscending, setIsAscending] = useState(false);
  const [sortAfter, setSortAfter] = useState("date");
  const [rideType, setRideType] = useState("");

  const [rides, setRides] = useState<AllRide[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await
        getAllRides(1)

      if (!data || !data.rides) throw new Error("No rides found");
      setRides(data.rides);
    })();
  }, []);

  const ride_id = Number(id);

  if (!rides) {
    return <>Loading rides...</>;
  }

  if (rides.length === 0) {
    return <>No Rides yet</>
  }

  // Test if all-rides was called with a id, if so find the exact route

  if (ride_id) {
     const ride = rides.find(r => Number(r.ride_id) === ride_id);

  if (!ride) {
    //return <StatusOverlay text="Ride not found!" isError={true}></StatusOverlay>;
    return <>Loading ride</>;
  } else {
    return <SummaryRide ride={ride}></SummaryRide>
  };

  }

  const ridesToday = getRidesToday(rides);
  const ridesYesterday = getRidesYesterday(rides);

  return (
    <div className='w-full flex'>

      {/* TabsList links */}
      <Tabs defaultValue="today" className="w-full flex flex-col gap-3">

        <div className="flex flex-col md:justify-between gap-3 md:flex-row
        md:items-center">

          <div className="flex flex-col gap-1 text-center">
            <h2 data-testid="h2text" className="text-3xl font-extrabold">Rides</h2>
            <p className="text-base text-gray-600 dark:text-gray-500">
              Visit, sort and sceify every ride you took!
            </p>
          </div>

        <div className="flex flex-col items-center md:items-end gap-3">

          <TabsList className="grid grid-cols-3 md:w-auto max-w-[400px] ">
            <TabsTrigger value="today" data-testid="today">Today</TabsTrigger>
            <TabsTrigger value="yesterday" data-testid="yesterday">Yesterday</TabsTrigger>
            <TabsTrigger value="every" data-testid="every">Every</TabsTrigger>
          </TabsList>
          <div className="w-full md:w-auto flex flex-row justify-between
           items-center md:gap-6">
            <div className="flex flex-row items-center gap-1">
              <Select defaultValue="date">
                <SelectTrigger className={`max-w-[70px] px-1 border-2
                  border-gray-400/50`}
                  data-testid="select-trigger">
                  <ListFilter></ListFilter>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="date"
                    onClick={() => setSortAfter("date")}
                    className="md:text-lg"
                    data-testid="date"
                  >
                    Date
                  </SelectItem>
                  <SelectItem
                    value="distance"
                    onClick={() => setSortAfter("distance")}
                    className="md:text-lg"
                    data-testid="distance"
                  >
                    Distanz
                  </SelectItem>

                  <SelectItem
                    value="duration"
                    onClick={() => setSortAfter("duration")}
                    className="md:text-lg"
                    data-testid="duration"
                  >
                    Dauer
                  </SelectItem>
                </SelectContent>
              </Select>
              <ArrowDown className={`w-8 h-8 md:w-10 md:h-10
               ${isDescending ? "text-violet-400" : ''} `}
                onClick={() => {
                  setIsDescending(!isDescending);
                  setIsAscending(!isAscending)
                }}
                data-testid="desc"></ArrowDown>
              <ArrowUp className={`w-8 h-8  md:w-10 md:h-10
              ${isAscending ? "text-violet-400" : ''} `}
                onClick={() => {
                  setIsAscending(!isAscending);
                  setIsDescending(!isDescending)
                }}
                data-testid="asc"></ArrowUp>
            </div>

            <Select>
              <SelectTrigger className="w-[180px] border-2 
              border-violet-300 rounded-md md:text-lg">
                <SelectValue placeholder="Art der Fahrt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="every"
                  onClick={() => setRideType("every")}
                  className="md:text-lg"
                >
                  Every
                </SelectItem>
                <SelectItem
                  value="botenfahrt"
                  onClick={() => setRideType("botenfahrt")}
                  className="md:text-lg"
                >
                  Botenfahrt
                </SelectItem>
                <SelectItem
                  value="taxifahrt"
                  onClick={() => setRideType("taxifahrt")}
                  className="md:text-lg"
                >
                  Taxifahrt
                </SelectItem>
              </SelectContent>
            </Select>

          </div>

        </div>
        </div>



        {/* TabsContent rechts */}
        <div className="w-full">
          <TabsContent value="today">
            <RideAtDate rides={ridesToday} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
          <TabsContent value="yesterday">
            <RideAtDate rides={ridesYesterday} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
          <TabsContent value="every">
            <RideAtDate rides={rides} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default AllRides
