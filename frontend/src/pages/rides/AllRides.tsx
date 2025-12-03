
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

const AllRides = () => {

  const rides = useSelector((state: RootState) => state.allRidesSlice);
  console.log(rides);
  return (
    <div className='w-full'>
      <ul className='w-full grid grid-cols-1 md:grid-cols-4 gap-4'>
        {rides.map((ride, index) => (
          <li key={index} className='w-full'>
            <Card>
              <CardHeader>
                <CardTitle>{ride.rideID}</CardTitle>
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
