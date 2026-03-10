import { Icon } from "leaflet";

/**
 * Leaflet icon representing the driver's current location on the map.
 * 
 * Uses a dot image (32x32) centered on the driver's GPS coordinates.
 * The icon anchor is set to the center for precise positioning.
 */
export const driverIcon = new Icon({
  iconUrl: "/dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

/**
 * Leaflet icon representing destination or waypoint markers on the map.
 * 
 * Uses a custom marker image (50x50) centered on the location coordinates.
 * The icon anchor is set to the center for precise positioning, similar to CSS transform translate(-50%, -50%).
 */
export const locationIcon = new Icon({
  iconUrl: "/karte3.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], //This will actually center the icon on to the location. its like translate -50%
});
