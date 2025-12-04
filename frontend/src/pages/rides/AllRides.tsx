
import { useSelector } from 'react-redux'
import type { RootState } from '../../../redux/store'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// const driverIcon = new Icon({
//   iconUrl: '/dot.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 16],
// });

const AllRides = () => {

  const rides = useSelector((state: RootState) => state.allRidesSlice);
//   console.log(rides);


//   const {id} = useParams();
//   const rideId = Number(id);

//   if (!rides || rides.length === 0) {
//   return <>Loading rides…</>; 
// }

// const ride = rides.find(r => Number(r.rideID) === rideId);
// console.log("Ride and id: ", ride, id)

// if (!ride && id) {
//    return <>Ride not found</>
// } else if (!id) {
//   console.log()
// } else {
//   return <SummaryRide wholeRide={rides[rideId - 1].wholeRide} driverIcon={driverIcon}></SummaryRide>
// };


  return (
    <div className='w-full'>
      <ul className='w-full grid grid-cols-1 md:grid-cols-4 gap-4'>
        {rides.map((ride, index) => (
          <li key={index} className='w-full'>
            <Card>
              <CardHeader>
                <CardTitle>{ride.start_address}</CardTitle>
                <CardDescription>{ride.distance}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </li>

        ))}
      </ul>
    </div>
  )
}

export default AllRides
