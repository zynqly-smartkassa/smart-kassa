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
import type { AllRide } from '../../../constants/AllRide';
import { driverIcon, locationIcon } from '../../utils/icons';
import StatusOverlay from '../../components/StatusOverlay';

/**
 * Args for the SummaryRide component.
 * 
 * @property {AllRide} ride - The ride object containing all details about the completed ride.
 */
interface SummaryRideArgs {
  ride: AllRide
};

/**
 * Args for the DrawMap component.
 * 
 * @property {[number, number][]} whole_ride - Array of coordinate pairs [latitude, longitude] representing the complete route of the ride.
 */
interface DrawMapArgs {
  whole_ride: [number, number][]
}

/**
 * Component that animates the drawing of a ride route on a Leaflet map.
 * 
 * This component draws an animated polyline on the map showing the complete ride path.
 * It places markers at the start and end locations and animates a driver icon moving along the route.
 * The animation runs at 250ms intervals per coordinate point.
 * 
 * @param {DrawMapArgs} data - The args containing the ride coordinates.
 * @returns {null} This component doesn't render any JSX, it only manipulates the Leaflet map.
 */
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
    L.marker(wholeRide[0], {icon: locationIcon}).addTo(map);

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

        routePolyline.current?.addLatLng(wholeRide[i]);
        animatedMarker.current?.setLatLng(wholeRide[i]);

        if (!wholeRide[i + 1]) {
          L.marker(wholeRide[i], {icon: locationIcon}).addTo(map);
          // At the last index, adjust the driver icon a little bit so it can 
          // float over the Location Marker instead beneath it
          animatedMarker.current?.setLatLng([wholeRide[i][0] - 0.00003, 
          wholeRide[i][1] - 0.00003]);
        }

        currentIndex.current = ++i;
      } else {
        clearInterval(drawer);

        //Center Route
        if (routePolyline.current) {
          map.fitBounds(routePolyline.current.getBounds(), {
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

/**
 * Component that displays a detailed summary of a completed ride.
 * 
 * This component shows comprehensive ride information including an animated map visualization,
 * ride statistics (ID, vehicle, type), timeline with start/end locations and times, and total duration.
 * If ride data is missing or incomplete, appropriate error messages are displayed.
 * 
 * @param {SummaryRideArgs} args - The args containing the ride data to display.
 * @returns {JSX.Element} A detailed ride summary view with map and statistics.
 */
export const SummaryRide = ({ ride }: SummaryRideArgs) => {
  const navigator = useNavigate();

  const labelClass = 'text-gray-500 text-sm md:text-lg'
  const valueClass = 'font-bold text-lg md:text-2xl';

  if (!ride) {
    return <StatusOverlay text='Fahrtdaten konnten nicht geladen werden. Bitte versuchen Sie es erneut oder überprüfen Sie, ob die Fahrt noch existiert.'
    isError={true}></StatusOverlay>
  }

  const wholeRide: [number, number][] = ride.whole_ride;

  return (

    <div className='w-full flex flex-col gap-8 md:gap-6 items-center z-20'>

      <Button variant={"ghost"} onClick={() => navigator("/all-rides")}
        className='self-start p-0'>
        <ArrowLeft></ArrowLeft>
        <span className='font-bold text-2xl'>Fahrtzusammenfassung</span>
      </Button>

      {!ride.whole_ride && (
        <StatusOverlay text='Kartendaten für diese Fahrt fehlen. Die Route kann nicht angezeigt werden.'
        isError={true}></StatusOverlay>

      )}
      {ride.whole_ride && (
        <MapContainer
          center={wholeRide[0]}
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
          <span className={labelClass}>Fahrt-ID: </span>
          <span className={valueClass}>{ride.ride_id}</span>
        </div>

        {/* Ride Finished successfuly and Ride statistics */}
        <div className='flex flex-col gap-2  w-full md:flex-row md:gap-8'>
          <div className='flex flex-row gap-1 items-center'>
            <BadgeCheck size={28} fill="#10B981" color='green'></BadgeCheck>
            <span className={valueClass}>Fahrt erfolgreich abgeschlossen</span>
          </div>

          <div className='flex flex-row gap-8'>
            <div className='flex flex-col text-left w-1/3
            md:w-full md:flex-row md:gap-1 md:items-center'>
              <span className={labelClass}>Fahrzeug:</span>
              <span className={valueClass}>{ride.vehicle_id}</span>
            </div>


            <div className='bg-gray-500/30 w-0.5 h-full'></div>

            <div className='flex flex-col text-left w-1/3 md:w-full'>
              <span className={labelClass}>Fahrtinfo:</span>
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
          <span className={valueClass}>Fahrtdauer: </span>
          <span className={valueClass}> {formatMinutes(durationToMinutes(ride.duration))}</span>
        </div>

      </div>
    </div>


  )
}

export default SummaryRide
