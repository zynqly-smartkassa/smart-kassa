import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useDriverLocation = (isRideActive: boolean) => {
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);

   // Update driver
  useEffect(() => {
    // To get the current location
    navigator.geolocation.getCurrentPosition(
      (lc) => {
        console.log("Location loaded:", lc.coords.latitude, lc.coords.longitude);
        setDriverLocation([lc.coords.latitude, lc.coords.longitude]);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            toast("Error while loading the current location of the driver:", {
              position: "top-center",
              closeButton: true,
            });
            break;
          case err.POSITION_UNAVAILABLE:
            toast("GPS not available. Ensure that the device has a built in GPS!", {
              position: "top-center",
              closeButton: true,
            });
            break;
          case err.TIMEOUT:
            toast("GPS request was timed out because the request has taken too long.", {
              position: "top-center",
              closeButton: true,
            });
            break;
          default:
            toast("Unknown GPS failure", {
              position: "top-center",
              closeButton: true,
            });
        }
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 }
    );

    // To udate the location
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("Live Update:", pos.coords.latitude, pos.coords.longitude);
        setDriverLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            toast("GPS denied during live tracking!", {
              position: "top-center",
              closeButton: true,
            });
            break;
          case err.POSITION_UNAVAILABLE:
            toast("GPS not available during live tracking!", {
              position: "top-center",
              closeButton: true,
            });
            break;
          case err.TIMEOUT:
            toast("GPS live update timed out.", {
              position: "top-center",
              closeButton: true,
            });
            break;
          default:
            toast("Unknown GPS error during live tracking.", {
              position: "top-center",
              closeButton: true,
            });
        }
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 }
    );

    // clean live tracker
    return () => navigator.geolocation.clearWatch(watchId);
  }, [])

  useEffect(() => {
    let lat = driverLocation?.[0] ?? 48.21;
    let lng = driverLocation?.[1] ?? 16.36;

    let interval: number | undefined;
    if (isRideActive) {
      interval = setInterval(() => {
        lat += 0.0001;
        lng += 0.0001;
        setDriverLocation([lat, lng]);
      }, 1000);
    }


    return () => clearInterval(interval);
  }, [isRideActive, driverLocation]);

  return driverLocation;
}


