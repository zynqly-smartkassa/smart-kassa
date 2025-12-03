import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router';
import { BadgeCheck } from 'lucide-react';
import BasicTimeline from '@/components/ui/basicTimeline';
import { Clock3 } from 'lucide-react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from 'react';

interface dataArgs {
  label: string,
  value: string
}

const rideInfo: dataArgs[] = [
  {
    label: "Start Info",
    value: "30 Mar 22, 11:00 am | Wien Fünfhaus"
  },
  {
    label: "End info",
    value: "30 Mar 22, 12:00 am | Wien Schonhaus"
  }
]

interface SummaryRideProps {
  wholeRide: [number, number][];
  driverIcon: L.Icon;
};

export const DrawMap = (data: SummaryRideProps) => {

  const wholeRide = data.wholeRide;
  const map = useMap();
  // This will hold the whole ride at the end
  const routePolyline = useRef<L.Polyline | null>(null);

  // Animated "driver" marker
  const animatedMarker = useRef<L.Marker | null>(null);

  const currentIndex = useRef(1);

  useEffect(() => {

    // Fixed Start marker
    L.marker(wholeRide[0]).addTo(map);

    routePolyline.current = L.polyline([], { color: 'violet' }).addTo(map);
    animatedMarker.current = L.marker(wholeRide[0], { icon: data.driverIcon }).addTo(map);

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
      }
    }

    const drawer = setInterval(addToLine, 250);
  }, [])

  return null;
}

export const SummaryRide = (data: SummaryRideProps) => {
  const navigator = useNavigate();
  const labelClass = 'text-gray-500 text-sm'
  const valueClass = 'font-bold text-lg';

  return (


    <div className='w-full flex flex-col gap-8 items-center z-20'>

      <Button variant={"ghost"} onClick={() => navigator(-1)}
        className='self-start p-0'>
        <ArrowLeft></ArrowLeft>
        <span className='font-bold text-2xl'>Ride Summary</span>
      </Button>

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

        <DrawMap wholeRide={data.wholeRide} driverIcon={data.driverIcon}></DrawMap>
      </MapContainer>

      {/* Ride ID */}
      <div className='w-full flex flex-col gap-4'>
        <div className='flex items-center gap-1'>
          <span className={labelClass}>Ride ID: </span>
          <span className={valueClass}>BHC23456789C</span>
        </div>

        {/* Ride Finished successfuly and Ride statistics */}
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-row gap-1 items-center'>
            <BadgeCheck size={28} fill="#10B981" color='green'></BadgeCheck>
            <span className={valueClass}>Ride finished successfully</span>
          </div>

          <div className='flex flex-row gap-8'>
            <div className='flex flex-col text-left w-1/3'>
              <span className={labelClass}>Car:</span>
              <span className={valueClass}>TSHY245</span>
            </div>


            <div className='bg-gray-500/30 w-0.5 h-full'></div>

            <div className='flex flex-col text-left w-1/3'>
              <span className={labelClass}>Ride info:</span>
              <span className={valueClass}>Botenfahrt</span>
            </div>
          </div>
        </div>

        {/* Start and End info */}
        <div className='w-full'>
          {BasicTimeline(labelClass, valueClass, rideInfo)}
        </div>

        {/* Ride Duration */}
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-row gap-1 items-center'>
            <Clock3 size={28}></Clock3>
            <span className={valueClass}>Total Ride Duration: </span>
            <span className={valueClass}>55 min</span>
          </div>

          <div className='flex flex-row gap-8'>
            <div className='flex flex-col text-left w-1/3'>
              <span className={labelClass}>Total Ride</span>
              <span className={valueClass}>50min</span>
            </div>

            <div className='bg-gray-500/30 w-0.5 h-full'></div>

            <div className='flex flex-col text-left w-1/3'>
              <span className={labelClass}>Total Pause</span>
              <span className={valueClass}>5 min</span>
            </div>
          </div>
        </div>



      </div>
    </div>


  )
}

export default SummaryRide
