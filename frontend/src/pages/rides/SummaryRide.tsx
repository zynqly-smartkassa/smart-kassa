import { Button } from '../../components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router';
import { BadgeCheck } from 'lucide-react';
import BasicTimeline from '../../components/ui/basicTimeline';
import { Clock3 } from 'lucide-react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from 'react';
import { durationToMinutes, formatMinutes } from '../../utils/rides/summaryMinutes';
import type { AllRide } from 'constants/AllRide';
import { driverIcon } from '../../utils/icons';
import StatusOverlay from '../../components/StatusOverlay';

interface SummaryRideArgs {
  ride: AllRide
};

interface DrawMapArgs {
  whole_ride: [number, number][]
}

export const DrawMap = (data: DrawMapArgs) => {

  const map = useMap();
  const wholeRide = data.whole_ride;

  // This will hold the whole ride at the end
  const routePolyline = useRef<L.Polyline | null>(null);

  // Animated "driver" marker
  const animatedMarker = useRef<L.Marker | null>(null);

  const currentIndex = useRef(1);

  useEffect(() => {

    // Fixed Start marker
    L.marker(wholeRide[0]).addTo(map);

    routePolyline.current = L.polyline([], { color: 'violet' }).addTo(map);
    animatedMarker.current = L.marker(wholeRide[0], { icon: driverIcon }).addTo(map);

    return () => {
      if (routePolyline.current) map.removeLayer(routePolyline.current);
      if (animatedMarker.current) map.removeLayer(animatedMarker.current);
    }
  }, [])

  useEffect(() => {
    function addToLine() {
      let i = currentIndex.current;
      if (i < wholeRide.length) {

        if (!wholeRide[i + 1]) {
          L.marker(wholeRide[i]).addTo(map);
        }

        routePolyline.current?.addLatLng(wholeRide[i]);
        animatedMarker.current?.setLatLng(wholeRide[i]);

        currentIndex.current = ++i;
      } else {
        clearInterval(drawer);

        //Center Route
        if (routePolyline.current) {
          map.flyToBounds(routePolyline.current.getBounds(), {
            padding: [40, 40],
            duration: 1
          });
        }
      }
    }

    const drawer = setInterval(addToLine, 250);

    return () => {
      clearInterval(drawer);
    }
  }, [])

  return null;
}

export const SummaryRide = ({ ride }: SummaryRideArgs) => {
  const navigator = useNavigate();

  const labelClass = 'text-gray-500 text-sm md:text-lg'
  const valueClass = 'font-bold text-lg md:text-2xl';

  if (!ride) {
    return <StatusOverlay text='Ride data could not be loaded. Please try again or check if the ride still exists.' 
    isError={true}></StatusOverlay>
  }

  const wholeRide: [number, number][] = ride.whole_ride;

  return (

    <div className='w-full flex flex-col gap-8 md:gap-6 items-center z-20'>

      <Button variant={"ghost"} onClick={() => navigator("/all-rides")}
        className='self-start p-0'>
        <ArrowLeft></ArrowLeft>
        <span className='font-bold text-2xl'>Ride Summary</span>
      </Button>

      {!ride.whole_ride && (
        <StatusOverlay text='Map data for this ride is missing. The route cannot be displayed.' 
        isError={true}></StatusOverlay>

      )}
      {ride.whole_ride && (
        <MapContainer
          center={[48.210033, 16.363449]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          {/* TileLayer actually shows the individual layers of the whole map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <DrawMap whole_ride={wholeRide} />
        </MapContainer>
      )}


      {/* Ride ID */}
      <div className='w-full flex flex-col gap-4'>
        <div className='flex items-center gap-1'>
          <span className={labelClass}>Ride ID: </span>
          <span className={valueClass}>{ride.ride_id}</span>
        </div>

        {/* Ride Finished successfuly and Ride statistics */}
        <div className='flex flex-col gap-2  w-full md:flex-row md:gap-8'>
          <div className='flex flex-row gap-1 items-center'>
            <BadgeCheck size={28} fill="#10B981" color='green'></BadgeCheck>
            <span className={valueClass}>Ride finished successfully</span>
          </div>

          <div className='flex flex-row gap-8'>
            <div className='flex flex-col text-left w-1/3
            md:w-full md:flex-row md:gap-1 md:items-center'>
              <span className={labelClass}>Car:</span>
              <span className={valueClass}>{ride.vehicle_id}</span>
            </div>


            <div className='bg-gray-500/30 w-0.5 h-full'></div>

            <div className='flex flex-col text-left w-1/3 md:w-full'>
              <span className={labelClass}>Ride info:</span>
              <span className={valueClass}>{ride.ride_type
                .charAt(0).toUpperCase() + ride.ride_type.slice(1)}</span>
            </div>
          </div>
        </div>

        {/* Start and End info */}
        <div className='w-full'>
          {BasicTimeline(labelClass, valueClass, ride)}
        </div>

        {/* Ride Duration */}

        <div className='w-full flex flex-row gap-1 items-center'>
          <Clock3 size={28}></Clock3>
          <span className={valueClass}>Ride Duration: </span>
          <span className={valueClass}> {formatMinutes(durationToMinutes(ride.duration))}</span>
        </div>

      </div>
    </div>


  )
}

export default SummaryRide
