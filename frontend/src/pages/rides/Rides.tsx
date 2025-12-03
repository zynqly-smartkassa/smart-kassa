import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import "leaflet/dist/leaflet.css"
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../../routing.css';
import { Icon } from 'leaflet';
import { useEffect, useRef, useState, memo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatTime } from '@/utils/rides/formatTime';
import { geocodeAddress } from '@/utils/rides/geoAdress';
import { useDriverLocation } from '@/hooks/rides/useDriverLocation';
import { useRideStates } from '@/hooks/rides/useRideStates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import SummaryRide from './SummaryRide';


/**
 * The Rides page, where a driver can start/end a Ride
 * @returns Rides Page
 * @author Casper Zielinski
 * @author Umejr Dzinovic
 */
const locationIcon = new Icon({
  iconUrl: '/karte3.png',
  iconSize: [50, 50],
  iconAnchor: [25, 25], //This will actually center the icon on to the location. its like translate -50%
});

const driverIcon = new Icon({
  iconUrl: '/dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});


type RoutingMachineProps = {
  start: [number, number];
  end: [number, number];
};

// This will create the route itself between start and end address
export const RoutingMachine = ({ start, end }: RoutingMachineProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      // ensures that the driver cannot change the route
      routeWhileDragging: false,
      // this will not show any alternative routes
      showAlternatives: false,
      // driver cannot add new wayoints to the route
      addWaypoints: false,
      lineOptions: {
        styles: [{ weight: 5 }]
      },
      // This will ensure that leaflet doesn't add additional markers
      createMarker: () => null
    }).addTo(map);

    // Clean
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;

};

// array that stores coordinates of our ride, to make a summary at the end of the ride
const wholeRide: [number, number][] = []

// memo from react ensures that this element is only rendered new, if and only if the lat and lng have actually updated itself
export const RecenterMap = memo(
  ({ lat, lng }: { lat: number, lng: number }) => {
    const map = useMap();

    const lastLocation = useRef<[number, number] | null>(null);

    useEffect(() => {
      if (!lastLocation.current) {
        lastLocation.current = [lat, lng];
        map.flyTo([lat, lng], map.getZoom(), { duration: 1 });
        return;
      }

      const [prevLat, prevLng] = lastLocation.current;
      const distance = map.distance([prevLat, prevLng], [lat, lng]);

      const lastIndex = wholeRide.length - 1;
      if (lastIndex <= 0) {
        wholeRide.push([lat, lng]);
      }

      if (distance > 50) {
        // only fly if moved more than 30m
        // smooth transition to the *new* current locaton
        map.flyTo([lat, lng], map.getZoom(), { duration: 1 });
        lastLocation.current = [lat, lng];
        wholeRide.push([lat, lng]);
      }
    }, [map, lat, lng]);
    return null;
  }
);

const Rides = () => {

  // This will track if the ride was successfully ended, to be able to load <Bill> logically
  const [isEnd, setIsEnd] = useState(false);
  const [isRideActive, setIsRideActive] = useState(false);

  const driverLocation = useDriverLocation(isRideActive);
  const {
    destination,
    setDestination,
    destinationCoords,
    setDestinationCoords,
    routingStartCoords,
    timer,
    setTimer,
    showNewRoute,
    checkRide
  } = useRideStates(isRideActive, driverLocation);

  const isMobile = useIsMobile();
  // We won't show the rides tab to deksto! only all-rides
  const defaultTabValue = isMobile ? "new-ride" : "all-rides";

  if (!driverLocation) {
    return <p className="text-center mt-4">Warte auf GPS-Daten…</p>;
  }

  if (!isRideActive && isEnd) {
    return <SummaryRide wholeRide={wholeRide} driverIcon={driverIcon}/>
  }

  return (
    <Tabs defaultValue={defaultTabValue} className="w-full flex flex-col gap-2 z-20">

      <TabsList className="grid grid-cols-2 md:grid-cols-1 w-full md:w-auto
      md:hidden max-w-[400px]">
        <TabsTrigger value="new-ride">Start Ride</TabsTrigger>
        <TabsTrigger value="all-rides">All Rides</TabsTrigger>
      </TabsList>

      <h2 className='hidden md:block font-bold text-3xl text-left'>Rides</h2>
      <TabsContent value='new-ride' className='md:hidden flex flex-col gap-2'>

        <p className='w-full text-5xl font-bold text-center'>
          {formatTime(timer)}
        </p>

        <MapContainer
          center={driverLocation ?? [48.210033, 16.363449]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          {/* TileLayer actually shows the individual layers of the whole map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* This will ensure that the markers get clustered into one "container" marker */}
          <MarkerClusterGroup>
            {driverLocation && (
              <>
                {/* Driver current location */}
                <Marker position={driverLocation} icon={driverIcon}></Marker>
                <RecenterMap lat={driverLocation[0]} lng={driverLocation[1]} />
              </>
            )}

            {/* Marker for destination address */}
            {destinationCoords && (
              <Marker position={destinationCoords} icon={locationIcon}></Marker>
            )}
          </MarkerClusterGroup>

          {/* Destination-Routing */}
          {routingStartCoords && destinationCoords && (
            <RoutingMachine start={routingStartCoords} end={destinationCoords} />
          )}

        </MapContainer>
        <Input
          type="text"
          placeholder="Mariahilfer Straße 120, Wien"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className='w-full p-3 mb-4 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-150'
          disabled={isRideActive}
        />

        <Button
          onClick={async () => {
            if (!destination) {
              toast("Bitte geben sie eine Adresse ein!", {
                position: "top-center",
                closeButton: true,
              });
              return;
            }
            const coords = await geocodeAddress(destination);
            if (coords) {
              setDestinationCoords(coords);
              showNewRoute();
            } else {
              toast("Bitte gebe eine echte Adresse ein!", {
                position: "top-center",
                closeButton: true,
              });
            }


          }}
          disabled={isRideActive}

          className={`w-full py-6 mb-6 font-semibold text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 transition duration-150 ease-in-out`}
        >
          Route berechnen
        </Button>

        <div className='w-full grid grid-cols-2 gap-4'>
          <Button

            className={`py-6 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-150 ease-in-out`}
            onClick={() => {
              setIsRideActive(true);
              wholeRide.length = 0; //Clear the array
            }}
            disabled={isRideActive}>
            Start Fahrt
          </Button>

          <Button

            className={`py-6 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out`}
            onClick={() => {
              setIsRideActive(false);
              setDestinationCoords(null);
              setDestination("");
              setTimer(0);
              if (checkRide()) setIsEnd(true);
            }}
            disabled={!isRideActive}>
            End Fahrt
          </Button>
        </div>
      </TabsContent>

      <TabsContent value='all-rides'>
            <p>All Rides</p>
      </TabsContent>

    </Tabs>
  )

}


export default Rides
