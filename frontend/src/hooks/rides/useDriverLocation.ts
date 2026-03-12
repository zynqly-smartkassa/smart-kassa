import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Geolocation } from "@capacitor/geolocation";
import { isMobile } from "../layout/use-mobile";

const IS_DEV = import.meta.env.MODE !== "production";

/**
 * Custom hook that manages the driver's location using the Capacitor Geolocation API.
 *
 * In development mode (MODE !== "production"), real GPS is skipped and movement is
 * simulated by incrementing lat/lng every second when the ride is active.
 *
 * @param {boolean} isRideActive - Whether a ride is currently in progress (used for dev simulation).
 * @returns {[number, number] | null} The driver's location as [latitude, longitude] or null if not yet determined.
 */
export const useDriverLocation = (isRideActive: boolean): [number, number] | null => {
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(
    null,
  );

  // Dev-only: simulate movement when ride is active
  useEffect(() => {
    if (!IS_DEV) return;
    if (!driverLocation) return;

    if (!isRideActive) return;

    let lat = driverLocation[0];
    let lng = driverLocation[1];

    const interval = setInterval(() => {
      lat += 0.0001;
      lng += 0.0001;
      setDriverLocation([lat, lng]);
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRideActive]);

  useEffect(() => {
    let watchId: string | undefined;

    const initLocation = async () => {
      try {
        const permission = await Geolocation.checkPermissions();

        if (permission.location !== "granted") {
          const request = await Geolocation.requestPermissions();

          // Only show error toast if user explicitly denied
          if (request.location === "denied") {
            toast(
              "Standort-Berechtigung verweigert. Bitte erlaube den Zugriff in den Einstellungen.",
              {
                position: "top-center",
                closeButton: true,
                className: "mt-5 md:mt-0",
              },
            );
            return;
          }

          // If still not granted after request, return silently
          if (request.location !== "granted") {
            console.warn("Permission not granted, but not explicitly denied");
            return;
          }
        }

        // Get initial position
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: isMobile, //isMobile
          timeout: 10000,
          maximumAge: 3000,
        });

        setDriverLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);

        watchId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: isMobile, //isMobile
            timeout: 5000,
            maximumAge: 3000,
          },
          (position, err) => {
            if (err) {
              handleGeolocationError(err);
              return;
            }

            if (position) {
              setDriverLocation([
                position.coords.latitude,
                position.coords.longitude,
              ]);
            }
          },
        );
      } catch (error: unknown) {
        handleGeolocationError(error);
      }
    };

    initLocation();

    // Cleanup
    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, []);

  return driverLocation;
};

/**
 * Handles geolocation errors and displays appropriate error messages to the user.
 *
 * This function logs the error to the console and shows a toast notification with
 * the error details. It specifically handles GeolocationPositionError instances.
 *
 * @param {unknown} err - The error object from the geolocation API.
 */
function handleGeolocationError(err: unknown) {
  console.error("Geolocation error:", err);
  let errorMessage = "GPS-Error";

  if (err instanceof GeolocationPositionError) {
    errorMessage += ": " + err.message;
  } else {
    errorMessage = "Uknown GPS-Error";
  }

  toast(errorMessage, {
    position: "top-center",
    closeButton: true,
    className: "mt-5 md:mt-0",
  });
}
