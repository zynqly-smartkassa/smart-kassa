import { Icon } from "leaflet";

export const driverIcon = new Icon({
  iconUrl: "/dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export const locationIcon = new Icon({
  iconUrl: "/karte3.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25], //This will actually center the icon on to the location. its like translate -50%
});
