import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../../routing.css";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { formatTime } from "../../utils/rides/formatTime";
import { geocodeAddress } from "../../utils/rides/geoAdress";
import { useDriverLocation } from "../../hooks/rides/useDriverLocation";
import { useRideStates } from "../../hooks/rides/useRideStates";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { reverseGeocode } from "../../utils/rides/reverseGeocode";
import { getDateNow } from "../../utils/rides/getDate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { sendRide } from "../../utils/rides/ride";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatusOverlay from "../../components/StatusOverlay";
import { ROUTING_CONFIG } from "../../utils/config";
import { driverIcon, locationIcon } from "../../utils/icons";

/**
 * The Rides page, where a driver can start/end a Ride
 * @returns Rides Page
 */

/**
 * Component that creates and manages the routing between start and end locations on a Leaflet map.
 * 
 * This component uses Leaflet Routing Machine to calculate and display routes. It supports both
 * OSRM demo mode and Mapbox routing modes. The route is non-draggable and doesn't show alternatives.
 * 
 * @param {Object} args - The args for the component.
 * @param {[number, number]} args.start - Start coordinates as [latitude, longitude].
 * @param {[number, number]} args.end - End coordinates as [latitude, longitude].
 * @param {(text: string) => void} args.setRoutingError - Callback to handle routing errors.
 * @param {React.MutableRefObject<L.Routing.Control | null>} args.routingRef - Reference to the routing control for external manipulation.
 * @returns {null} This component doesn't render any JSX, it only manipulates the Leaflet map.
 */
// This will create the route itself between start and end address
export const RoutingMachine = ({
  start,
  end,
  setRoutingError,
  routingRef,
}: {
  start: [number, number];
  end: [number, number];
  setRoutingError: (text: string) => void;
  routingRef: React.MutableRefObject<L.Routing.Control | null>;
}) => {
  const map = useMap();

  // use ref to hold control between renders
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map) return;

    if (routingControlRef.current) return;

    let router;
    // osrm demo for testing only
    if (ROUTING_CONFIG.mode === "demo") {
      router = L.Routing.osrmv1({
        serviceUrl: ROUTING_CONFIG.demo.serviceUrl,
      });
    } else if (ROUTING_CONFIG.mode === "mapbox") {
      // stable osrm for dev-ready-status
      router = L.Routing.mapbox(ROUTING_CONFIG.mapbox.apiKey);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routingControl = (L as any).Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      // ensures that the driver cannot change the route
      routeWhileDragging: false,
      // this will not show any alternative routes
      showAlternatives: false,
      // driver cannot add new wayoints to the route
      addWaypoints: false,
      lineOptions: {
        styles: [{ weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
      // This will ensure that leaflet doesn't add additional markers
      createMarker: () => null,
      router: router, // Tell leaflet to use this router
      collapsible: true, //Necassary for context menu
    }).addTo(map);

    // Will hide the context menu at the start
    routingControl.hide();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routingControl.on("routingerror", (e: any) => {
      console.error("Routing failed:", e);
      setRoutingError(
        "Die Route konnte nicht berechnet werden. Bitte probiere es später erneut."
      );
    });

    routingRef.current = routingControl;

    routingControlRef.current = routingControl;
  }, [end, map, start, setRoutingError]);

  // We are not building new control object, we are instead setting
  // new lng and lat
  useEffect(() => {
    if (routingControlRef.current) {
      const newWaypoints = [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ];

      routingControlRef.current.setWaypoints(newWaypoints);
    }
  }, [start, end]);

  return null;
};

/**
 * Component that recenters the map as the driver moves and tracks the complete ride path.
 * 
 * This memoized component smoothly pans the map to follow the driver's location and records
 * coordinate points when the driver moves more than 50 meters. It maintains the complete route
 * in the wholeRide array for later visualization.
 * 
 * @param {Object} args - The args for the component.
 * @param {number} args.lat - Current latitude of the driver.
 * @param {number} args.lng - Current longitude of the driver.
 * @param {[number, number][]} args.wholeRide - Array containing all recorded coordinate points of the ride.
 * @param {React.Dispatch<React.SetStateAction<[number, number][]>>} args.setWholeRide - State setter to update the ride path.
 * @returns {null} This component doesn't render any JSX, it only manipulates the Leaflet map.
 */
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

/**
 * Component that automatically zooms the map to the driver's location when a ride starts.
 * 
 * This component performs a one-time zoom animation to zoom level 16 centered on the driver's
 * location. It only executes once per mount to avoid repeated zooming during the ride.
 * 
 * @param {Object} args - The args for the component.
 * @param {number} args.lat - Latitude of the driver's location to zoom to.
 * @param {number} args.lng - Longitude of the driver's location to zoom to.
 * @returns {null} This component doesn't render any JSX, it only manipulates the Leaflet map.
 */
// When the driver clicks on "start Ride" we will automatically zoom onto the driver
export const ZoomDriver = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  const alreadyZoomed = useRef<boolean>(false);

  useEffect(() => {
    if (!alreadyZoomed.current) {
      map.setView([lat, lng], 16, { duration: 1 });
      alreadyZoomed.current = true;
    }
  }, [map, lat, lng]);

  return null;
};

/**
 * Component that tracks and accumulates the total distance traveled during a ride.
 * 
 * This component calculates the distance between consecutive GPS positions and updates
 * the total distance counter. It only adds to the distance when the driver has moved
 * more than 5 meters to filter out GPS noise.
 * 
 * @param {Object} args - The args for the component.
 * @param {number} args.lat - Current latitude of the driver.
 * @param {number} args.lng - Current longitude of the driver.
 * @param {React.Dispatch<React.SetStateAction<number>>} args.setDist - State setter to update the total distance traveled.
 * @returns {null} This component doesn't render any JSX, it only tracks distance.
 */
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

/**
 * Main Ride component that manages the complete ride lifecycle for drivers.
 * 
 * This component provides the interface for drivers to:
 * - View their current GPS location on a map
 * - Enter and geocode destination addresses
 * - Calculate routes to destinations
 * - Start and end rides with timer and distance tracking
 * - Select ride type (Botenfahrt/Taxifahrt)
 * - Automatically save completed rides to the backend
 * 
 * The component integrates GPS tracking, map visualization, routing, and ride state management.
 * It handles loading states, errors, and automatically navigates to the ride summary after completion.
 * 
 * @returns {JSX.Element} The complete ride management interface.
 */
const Ride = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // Necessary, to be able to delete the drawn route, if the route was unsuccessful
  const routingRef = useRef<L.Routing.Control | null>(null);

  const [routingError, setRoutingError] = useState<string | null>(null);

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

  const user_id = useSelector((state: RootState) => state.user.id);

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
    // Delete the drawn route
    routingRef.current?.remove();
    routingRef.current = null;
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
          user_id: Number(user_id),
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
          whole_ride: wholeRide, // botenfahrt/taxifahrt
        };
        try {
          const data = await sendRide(newRide);
          const ride_id = data.ride_info.ride_id;
          reInitialize();
          navigator(`/all-rides/${ride_id}`);
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => setIsLoading(false), 200); // Needed so navigator has enough time to switch
        }
      })();
    }
  }, [
    isRideActive,
    isSuccessful,
    driverLocation,
    destinationCoords,
    startTime,
    endTime,
    timer,
    distance,
    rideType,
    dispatch,
    reInitialize,
    user_id,
    navigator,
    wholeRide,
  ]);

  // Simle loading state
  if (!driverLocation) {
    return <StatusOverlay text="Warte auf GPS-Daten" isLoading={true} errorFallback={
      ["Zynqly benötigt Zugriff auf deinen Standort.",
        "Ist die Standortermittlung auf deinem Gerät aktiviert?"]
    } />;
  }

  if (isLoading) {
    return <StatusOverlay text="Fahrt wird verarbeitet" isLoading={true} />;
  }

  if (routingError) {
    return <StatusOverlay text={routingError} isError={true} />;
  }

  return (
    <div className="w-full flex flex-col z-20 gap-2">
      <h2 className="hidden md:block font-bold text-3xl text-left">Rides</h2>
      <div className="md:hidden flex flex-col gap-2">
        <p className="w-full text-5xl font-bold text-center"
          data-testid="timer">
          {formatTime(timer)}
        </p>

        {driverLocation && (
          <MapContainer
            center={driverLocation}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
            preferCanvas={true}
          >
            {/* TileLayer actually shows the individual layers of the whole map */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* This will ensure that the markers get clustered into one "container" marker */}
            <MarkerClusterGroup>

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


              {/* Marker for destination address */}
              {destinationCoords && (
                <Marker position={destinationCoords} icon={locationIcon}></Marker>
              )}
            </MarkerClusterGroup>

            {/* Destination-Routing */}
            {routingStartCoords && destinationCoords && (
              <RoutingMachine
                start={routingStartCoords}
                end={destinationCoords}
                setRoutingError={setRoutingError}
                routingRef={routingRef}
              />
            )}


            <DistanceTracker
              lat={driverLocation[0]}
              lng={driverLocation[1]}
              setDist={setDistance}
            ></DistanceTracker>


            {isRideActive && (
              <ZoomDriver
                lat={driverLocation[0]}
                lng={driverLocation[1]}
              ></ZoomDriver>
            )}
          </MapContainer>
        )}

        <div className="w-full flex justify-center">
          <Select
            onValueChange={(value) => setRideType(value)}>
            <SelectTrigger data-testid="select-trigger"
              className="w-[180px] border-2 border-violet-300 rounded-md">
              <SelectValue placeholder="Art der Fahrt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="botenfahrt"
                data-testid="botenfahrt"
              >
                Botenfahrt
              </SelectItem>
              <SelectItem
                value="taxifahrt"
                data-testid="taxifahrt"
              >
                Taxifahrt
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          data-testid="address"
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
          data-testid="calculate-route"
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
          className={`w-full py-6 mb-6 font-semibold text-white bg-violet-600
             rounded-lg shadow-md hover:bg-violet-700 transition duration-150 ease-in-out`}
        >
          Route berechnen
        </Button>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button
            data-testid="start-ride"
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
              setStartTime(getDateNow());
              setIsSuccessful(false);
            }}
            disabled={!isRoutCalculated || isRideActive}
          >
            Start Fahrt
          </Button>

          <Button
            data-testid="end-ride"
            className={`py-6 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out`}
            onClick={() => {
              setIsRideActive(false);
              setEndTime(getDateNow());
              if (checkRide()) {
                setIsSuccessful(true);
              } else {
                reInitialize(); // If the ride wasn't successful re-initialize ride objects
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
