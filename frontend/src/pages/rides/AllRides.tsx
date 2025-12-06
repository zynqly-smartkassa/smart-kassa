
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAllRides } from "@/utils/rides/all-rides";
import { useEffect, useState } from "react";
import type { AllRide } from 'constants/AllRide';
import RideAtDate from "./RideAtDate";
import { ListFilter, ArrowUp, ArrowDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const AllRides = () => {

  //const rides = useSelector((state: RootState) => state.allRidesSlice);
  //const user_id = useSelector((state: RootState) => state.user.id);
  //const navigator = useNavigate();
  const [rides, setRides] = useState<AllRide[] | null>(null);
  //const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await
        getAllRides(1)

      if (!data || !data.rides) throw new Error("No rides found");
      setRides(data.rides);
      console.log(data.rides)
    })();
  }, []);

  // const ride_id = Number(id);

  // if (!rides || rides.length === 0) {
  //   return <>Loading rides…</>;
  // }

  // const ride = rides.find(r => Number(r.ride_id) === ride_id);
  // console.log("Ride and id: ", ride, id)

  // if (!ride && id) {
  //   return <>Ride not found</>
  // } else if (!id) {
  //   console.log()
  // } else {
  //  // return <SummaryRide ride={rides[ride_id - 1]}></SummaryRide>
  // };

  if (!rides) return;

  function pad(n: number) {
    return n < 10 ? "0" + n : n.toString();
  }

  const ridesToday = rides.filter((element) => {
    const onlyDate = element.start_time.replace('T', ' ').split(" ")[0];
    const today = new Date();
    const [year, month, day] = onlyDate.split("-");

    if (pad(today.getFullYear()) === year &&
      pad(today.getMonth() + 1) === month &&
      pad(today.getDate()) === (day)) {
      return element;
    }
  })

  const ridesYesterday = rides.filter((element) => {
    const onlyDate = element.start_time.replace('T', ' ').split(" ")[0];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 200)
    const [year, month, day] = onlyDate.split("-");

    if (pad(yesterday.getFullYear()) === year &&
      pad(yesterday.getMonth() + 1) === month &&
      pad(yesterday.getDate()) === day) {
      return element;
    }
  })

  return (
    <div className='w-full flex'>
      {/* TabsList links */}
      <Tabs defaultValue="today" className="w-full flex flex-col gap-3">
        <div className="flex flex-col items-start md:w-auto max-w-[400px] gap-3">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            <TabsTrigger value="every">Every</TabsTrigger>
          </TabsList>
          <div className="flex flex-row items-center gap-3">
            
            <Select>
              <SelectTrigger className="max-w-[80px] border-2 border-violet-300 rounded-md">
                <ListFilter className="text-violet-400"></ListFilter>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="date"

                >
                  Date
                </SelectItem>
                <SelectItem
                  value="distance"

                >
                  Distanz
                </SelectItem>

                <SelectItem
                  value="type"

                >
                  Art
                </SelectItem>

                <SelectItem
                  value="duration"

                >
                  Dauer
                </SelectItem>
              </SelectContent>
            </Select>
            <ArrowUp className="w-8 h-8"></ArrowUp>
            <ArrowDown className="w-8 h-8"></ArrowDown>
          </div>

        </div>


        {/* TabsContent rechts */}
        <div className="w-full">
          <TabsContent value="today">
            <RideAtDate rides={ridesToday}></RideAtDate>
          </TabsContent>
          <TabsContent value="yesterday">
            <RideAtDate rides={ridesYesterday}></RideAtDate>
          </TabsContent>
          <TabsContent value="every">
            <RideAtDate rides={rides}></RideAtDate>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default AllRides
