import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import { getAllRides } from "../../utils/rides/all-rides";
import { useEffect, useRef, useState } from "react";
import type { AllRide } from 'constants/AllRide';
import RideAtDate from "./RideAtDate";
import { ListFilter, ArrowUp, ArrowDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { getRidesToday, getRidesYesterday } from "../../utils/rides/getRides";
import { useNavigate, useParams } from "react-router-dom";
import SummaryRide from "./SummaryRide";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../redux/store";
import type { NotificationsArgs } from "../../../redux/slices/notificationsSlice"
import { add } from "../../../redux/slices/notificationsSlice"
import { getDateNow } from "@/utils/rides/getDate";

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
  const [loading, setIsLoading] = useState(true);
  const [rides, setRides] = useState<AllRide[] | null>(null);
  const { id } = useParams();
  const user_id = useSelector((state: RootState) => state.user.id)
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //Necessary for testing, since without it every notification will be 
  // written twice
  const alreadyLoaded = useRef(false);


  useEffect(() => {
    (async () => {
      const data = await
        getAllRides(Number(user_id))

      if (!data || !data.rides) throw new Error("No rides found");
      setRides(data.rides);
      console.log(data.rides.length)
      
      if (alreadyLoaded.current) {return}
      alreadyLoaded.current = true;
      setIsLoading(false);
      if (data.rides.length >= 13) {
        const notification: NotificationsArgs = {
          icon: "trophy",
          title: "Your first ride",
          desc: "You successfully finished your first ride!",
          date: getDateNow(),
          read: false,
          color: "amber"
        }
        dispatch(add(notification))
        console.log(notification)
      }

      if (data.rides.length >= 5) {
        const notification: NotificationsArgs = {
          icon: "flame",
          title: "5-Rides Streak",
          desc: "You successfully finished 5 rides!",
          date: getDateNow(),
          read: false,
          color: "red"
        };
         const notification2: NotificationsArgs = {
          icon: "leaf",
          title: "5-Rides Streak",
          desc: "You successfully finished 5 rides!",
          date: getDateNow(),
          read: false,
          color: "green"
        }
        dispatch(add(notification))
        dispatch(add(notification2))
      }
       
    })();
  }, []);

  const ride_id = Number(id);

  if (loading) {
    return <>Loading rides...</>
  }

  if (!rides) {
    return <>Unfortunately there are no rides yet...</>
  }

  // Test if all-rides was called with a id, if so find the exact route

  if (ride_id) {
    const ride = rides.find(r => Number(r.ride_id) === ride_id);

    if (ride) {
      return <SummaryRide ride={ride}></SummaryRide>
    } else {
      console.log("Navigating back")
      // since id was not found, navigate to main all-rides
      navigator("/all-rides");
    }
  }

  const ridesToday = getRidesToday(rides);
  const ridesYesterday = getRidesYesterday(rides);

  return (
    <div className='w-full flex'>

      {/* TabsList left */}
      <Tabs defaultValue="today" className="w-full flex flex-col gap-3">

        <div className="flex flex-col md:justify-between gap-3 md:flex-row
        md:items-center">

          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 data-testid="h2text" className="page-title">Rides</h2>
            <p className="subheader">
              Visit and sort every ride you took!
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">

            <TabsList className="grid grid-cols-3 md:w-auto max-w-[400px] ">
              <TabsTrigger value="today" data-testid="show-today">Today</TabsTrigger>
              <TabsTrigger value="yesterday" data-testid="show-yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="all" data-testid="show-all">All</TabsTrigger>
            </TabsList>
            <div className="w-full md:w-auto flex flex-row justify-between
           items-center md:gap-6">
              <div className="flex flex-row items-center gap-1">
                <Select defaultValue="date"
                  onValueChange={(value) => setSortAfter(value)}>
                  <SelectTrigger className={`max-w-[70px] px-1 border-2
                  border-gray-400/50`}
                    data-testid="select-filter-trigger">
                    <ListFilter></ListFilter>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="date"
                      className="md:text-lg"
                      data-testid="date"
                    >
                      Date
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

              <Select defaultValue="all"
                onValueChange={(value) => setRideType(value)}>
                <SelectTrigger className="w-[180px] border-2 
              border-violet-300 rounded-md md:text-lg"
                  data-testid="select-only-trigger">
                  <SelectValue placeholder="Art der Fahrt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className="md:text-lg"
                    data-testid="only-all"
                  >
                    All
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
            <RideAtDate rides={ridesToday} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
          <TabsContent value="yesterday">
            <RideAtDate rides={ridesYesterday} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
          <TabsContent value="all">
            <RideAtDate rides={rides} sortAfter={sortAfter}
              isDescending={isDescending} rideType={rideType}></RideAtDate>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default AllRides
