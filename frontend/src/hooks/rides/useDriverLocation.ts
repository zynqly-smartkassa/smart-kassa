import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Geolocation } from "@capacitor/geolocation";
import { isMobile } from "../use-mobile";
// import { isMobile } from "../use-mobile";

/*
Code not fully tested and implemented by Claude, do not use it in Production!
*/
export const useDriverLocation = (isRideActive: boolean) => {
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(
    null
  );

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
              }
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

        // Start live tracking
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
          }
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

  useEffect(() => {
    let lat = driverLocation?.[0] ?? 48.21;
    let lng = driverLocation?.[1] ?? 16.36;

    let interval: number | undefined;
    // TEST/DEBUG: Simulates driver movement for development
    if (isRideActive) {
      interval = setInterval(() => {
        lat += 0.0005;
        lng += 0.0005;
        setDriverLocation([lat, lng]);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRideActive, driverLocation]);

  return driverLocation;
};

// Error Handler für Capacitor
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
