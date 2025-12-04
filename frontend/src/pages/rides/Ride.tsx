import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../../routing.css";
import { Icon } from "leaflet";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatTime } from "@/utils/rides/formatTime";
import { geocodeAddress } from "@/utils/rides/geoAdress";
import { useDriverLocation } from "@/hooks/rides/useDriverLocation";
import { useRideStates } from "@/hooks/rides/useRideStates";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { add } from "../../../redux/slices/allRidesSlice";
import { reverseGeocode } from "@/utils/rides/reverseGeocode";
import { getDate } from "@/utils/rides/getDate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendRide } from "@/utils/ride";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import StatusOverlay from "@/components/StatusOverlay";

/**
 * The Rides page, where a driver can start/end a Ride
 * @returns Rides Page
 * @author Casper Zielinski
 * @author Umejr Dzinovic
 */
const locationIcon = new Icon({
  iconUrl: "/karte3.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], //This will actually center the icon on to the location. its like translate -50%
});

const driverIcon = new Icon({
  iconUrl: "/dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});


// This will create the route itself between start and end address
export const RoutingMachine = ({ start, end }:
  {
    start: [number, number],
    end: [number, number]
  },

) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      // ensures that the driver cannot change the route
      routeWhileDragging: false,
      // this will not show any alternative routes
      showAlternatives: false,
      // driver cannot add new wayoints to the route
      addWaypoints: false,
      lineOptions: {
        styles: [{ weight: 5 }],
      },
      // This will ensure that leaflet doesn't add additional markers
      createMarker: () => null,
    }).addTo(map);

    // Clean
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};

// memo from react ensures that this element is only rendered new, if and only if the lat and lng have actually updated itself
export const RecenterMap = memo(
  ({
    lat,
    lng,
    wholeRide,
    setWholeRide,
  }: {
    lat: number;
    lng: number;
    wholeRide: [number, number][];
    setWholeRide: React.Dispatch<React.SetStateAction<[number, number][]>>;
  }) => {
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
        setWholeRide((array) => [...array, [lat, lng]]);
      }

      if (distance > 50) {
        // only fly if moved more than 30m
        // smooth transition to the *new* current locaton
        map.flyTo([lat, lng], map.getZoom(), { duration: 1 });
        lastLocation.current = [lat, lng];
        setWholeRide((array) => [...array, [lat, lng]]);
      }
    }, [map, lat, lng, wholeRide, setWholeRide]);
    return null;
  }
);

// When the driver clicks on "start Ride" we will automatically zoom onto the driver
export const ZoomDriver = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  const alreadyZoomed = useRef<boolean>(false);

  useEffect(() => {
    if (!alreadyZoomed.current) {
      map.flyTo([lat, lng], 16, { duration: 1.5 });
      alreadyZoomed.current = true;
    }
  }, [map, lat, lng]);

  return null;
};

export const DistanceTracker = ({
  lat,
  lng,
  setDist,
}: {
  lat: number;
  lng: number;
  setDist: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const map = useMap();

  const lastLocation = useRef<[number, number] | null>(null);

  useEffect(() => {
    if (!lastLocation.current) {
      lastLocation.current = [lat, lng];
      return;
    }

    const [prevLat, prevLng] = lastLocation.current;
    const distance = map.distance([prevLat, prevLng], [lat, lng]);

    if (distance > 5) {
      setDist((lastValue) => lastValue + distance);
      lastLocation.current = [lat, lng];
    }
  }, [map, lat, lng, setDist]);

  return null;
};

const Ride = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // array that stores coordinates of our ride, to make a summary at the end of the ride
  const [wholeRide, setWholeRide] = useState<[number, number][]>([]);

  // This will track if the ride was successfully ended, to be able to load <Bill> logically
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [isRideActive, setIsRideActive] = useState(false);

  const driverLocation = useDriverLocation(isRideActive);
  const {
    destination,
    setDestination,
    showDestinationHint,
    setShowDestinationHint,
    isDestinationInvalid,
    isRoutCalculated,
    setIsRouteCalculated,
    destinationCoords,
    setDestinationCoords,
    routingStartCoords,
    timer,
    setTimer,
    showNewRoute,
    checkRide,
  } = useRideStates(isRideActive, driverLocation);

  // Final Data,
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const user_id = useSelector((state: RootState) => state.user.id)

  const [distance, setDistance] = useState(0);

  // Which type?
  const [rideType, setRideType] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Re-Initialize fields for the next ride
  const reInitialize = useCallback(() => {
    setDistance(0);
    setDestinationCoords(null);
    setDestination("");
    setTimer(0);
    setIsSuccessful(false);
    setIsRouteCalculated(false);
  }, [setDestinationCoords, setDestination, setTimer, setIsRouteCalculated]);

  useEffect(() => {
    if (!isRideActive && isSuccessful && driverLocation && destinationCoords) {
      setIsLoading(true);
      (async () => {
        const [startAddress, endAddress] = await Promise.all([
          reverseGeocode(driverLocation[0], driverLocation[1]),
          reverseGeocode(destinationCoords[0], destinationCoords[1]),
        ]);

        const newRide = {
          user_id: Number(user_id) !== 0 ? Number(user_id) : 1,
          start_address: startAddress ?? "",
          start_time: startTime,
          start_lat: driverLocation[0],
          start_lng: driverLocation[1],
          end_address: endAddress ?? "",
          end_time: endTime,
          end_lat: destinationCoords[0],
          end_lng: destinationCoords[1],
          duration: formatTime(timer),
          distance: distance,
          ride_type: rideType,
          wholeRide: wholeRide // botenfahrt
        }
        try {
          const data = await sendRide(newRide);
          const ride_info = data.ride_info;
          const whole = {...ride_info, ...newRide};
          dispatch(add(whole));
          reInitialize();
          navigator("/all-rides/");
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => setIsLoading(false), 200); // Needed so navigator has enough time to switch
        }
      })();
    }
  }, [isRideActive, isSuccessful, driverLocation, destinationCoords, startTime, endTime, timer, distance, rideType, dispatch, reInitialize, user_id, navigator, wholeRide])

  // Simle loading state
  if (!driverLocation) {
    return <StatusOverlay text="Warte auf GPS-Daten…" />;
  }

  if (isLoading) {
    return <StatusOverlay text="Fahrt wird verarbeitet..." />;
  }

  return (
    <div className="w-full flex flex-col z-20 gap-2">
      <h2 className="hidden md:block font-bold text-3xl text-left">Rides</h2>
      <div className="md:hidden flex flex-col gap-2">
        <p className="w-full text-5xl font-bold text-center">
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
                <RecenterMap
                  lat={driverLocation[0]}
                  lng={driverLocation[1]}
                  wholeRide={wholeRide}
                  setWholeRide={setWholeRide}
                />
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

          {driverLocation && (
            <DistanceTracker lat={driverLocation[0]} lng={driverLocation[1]}
              setDist={setDistance}></DistanceTracker>
          )}

          {isRideActive && (
            <ZoomDriver
              lat={driverLocation[0]}
              lng={driverLocation[1]}
            ></ZoomDriver>
          )}
        </MapContainer>

        <div className="w-full flex justify-center">
          <Select>
            <SelectTrigger className="w-[180px] border-2 border-violet-300 rounded-md">
              <SelectValue placeholder="Art der Fahrt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="botenfahrt"
                onClick={() => setRideType("botenfahrt")}
              >
                Botenfahrt
              </SelectItem>
              <SelectItem
                value="taxifahrt"
                onClick={() => setRideType("taxifahrt")}
              >
                Taxifahrt
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          placeholder="Mariahilfer Straße 120, Wien"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onBlur={() => setShowDestinationHint(true)}
          onFocus={() => setShowDestinationHint(false)}
          className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-150
      ${isDestinationInvalid && showDestinationHint
              ? "border-red-500"
              : "border-violet-300"
            }`}
          disabled={isRideActive}
        />

        <AnimatePresence>
          {isDestinationInvalid && showDestinationHint && (
            <motion.p
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm"
            >
              Bitte geben Sie eine gültige Adresse ein!
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          onClick={() => {
            if (!destination) {
              toast("Bitte geben sie eine Adresse ein!", {
                position: "top-center",
                closeButton: true,
                className: "mt-5 md:mt-0",
              });
              return;
            }

            geocodeAddress(destination).then((coords) => {
              if (coords) {
                setDestinationCoords(coords);
                setTimeout(() => setIsRouteCalculated(true), 1000);
                showNewRoute();
              } else {
                toast("Bitte gebe eine echte Adresse ein!", {
                  position: "top-center",
                  closeButton: true,
                  className: "mt-5 md:mt-0",
                });
              }
            });
          }}
          disabled={isRideActive}
          className={`w-full py-6 mb-6 font-semibold text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 transition duration-150 ease-in-out`}
        >
          Route berechnen
        </Button>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button
            className={`py-6 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-150 ease-in-out`}
            onClick={() => {
              if (!destination) {
                toast("Bitte geben sie eine Adresse ein!", {
                  position: "top-center",
                  closeButton: true,
                  className: "mt-5 md:mt-0",
                });
                return;
              }
              if (!rideType) {
                toast("Bitte geben sie einen Fahrt-Typ an!", {
                  position: "top-center",
                  closeButton: true,
                });
                return;
              }
              setIsRideActive(true);
              setWholeRide(() => []);
              setStartTime(getDate());
              setIsSuccessful(false);
            }}
            disabled={!isRoutCalculated || isRideActive}
          >
            Start Fahrt
          </Button>

          <Button
            className={`py-6 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out`}
            onClick={() => {
              setIsRideActive(false);
              setEndTime(getDate());
              if (checkRide()) {
                setIsSuccessful(true);
              } else {
                reInitialize(); // If the ride wasn't successful re-initialize duration
              }
            }}
            disabled={!isRideActive}
          >
            End Fahrt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ride;
