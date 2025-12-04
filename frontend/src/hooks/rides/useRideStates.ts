import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { isValidAddressInput } from '../useValidator';

export const useRideStates = (isRideActive: boolean, 
  driverLocation: [number, number] | null,
) => {

  // Input
  const [destination, setDestination] = useState("");

  // Validation for destination...
  const [showDestinationHint, setShowDestinationHint] = useState(false);
  const isDestinationInvalid = !destination || !isValidAddressInput(destination);

  // Driver can't click start button, if route is not calculated
  const [isRoutCalculated, setIsRouteCalculated] = useState(false);

  // Actual coords of the adress
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);

  // We would actually use driverLocation, but since we dont want to update Route every second,
  // a second start Coords variable only for the route is needed
  const [routingStartCoords, setRoutingStartCoords] = useState<[number, number] | null>(null);

  const [timer, setTimer] = useState(0);

  // This variable is needed for the setRoutingStartCoords method, because without the ref
  // we would have to update the route every second, which causes some other bugs
  const driverLocationRef = useRef<[number, number] | null>(null);

  function showNewRoute() {

    const currentDriverLocation = driverLocationRef.current;

    if (currentDriverLocation) {
      // Setzt den Startpunkt auf die aktuelle Position
      setRoutingStartCoords(currentDriverLocation);
    }

  }

  const checkRide = () => {
    if (isRideActive && timer <= 5) {
      toast("The ride cannot be saved, because the ride lasted only under 1 minute.", {
        position: "top-center",
        closeButton: true,
        className: "mt-5 md:mt-0"
      });
      return false;
    } 

    return true;
  };

  useEffect(() => {

    driverLocationRef.current = driverLocation;

  }, [driverLocation]);


  useEffect(() => {
    if (!isRideActive) {
      return;
    }

    const interval = setInterval(() => {
      showNewRoute();
      console.log("Routing Line new")
    }, 10000)

    return () => clearInterval(interval);
  }, [isRideActive]);


  // This will center the karte on the current location (driver)

  // timer
  useEffect(() => {
    let interval: number | undefined;

    if (isRideActive) {
      interval = setInterval(() => {
        setTimer(last => last + 1);
      }, 1000)
    }

    return () => clearInterval(interval);
  }, [isRideActive])

  return {
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
    checkRide
  }

}

