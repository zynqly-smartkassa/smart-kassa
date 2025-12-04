import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Geolocation } from "@capacitor/geolocation";

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

        // ✅ 3. Get initial position
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 3000,
        });

        setDriverLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);

        // ✅ 4. Start live tracking
        watchId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 3000,
          },
          (position, err) => {
            if (err) {
              handleGeolocationError();
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
      } catch {
        handleGeolocationError();
      }
    };

    initLocation();

    // ✅ 5. Cleanup
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
function handleGeolocationError() {
  console.error("Geolocation error:");

  const errorMessage = "GPS-Fehler aufgetreten";

  toast(errorMessage, {
    position: "top-center",
    closeButton: true,
    className: "mt-5 md:mt-0",
  });
}
