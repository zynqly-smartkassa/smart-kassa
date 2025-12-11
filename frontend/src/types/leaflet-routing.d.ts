/* eslint-disable @typescript-eslint/no-explicit-any */
import * as L from "leaflet";

// Without this declaration, leaflet will not find "routing" etc... with ts
// errors following...
declare module "leaflet" {
  namespace Routing {
    // Typ für einzelne Waypoints
    type Waypoint = L.LatLng | L.LatLngLiteral;

    // Optionen für Routing Control
    interface RoutingControlOptions {
      waypoints: Waypoint[];
      routeWhileDragging?: boolean;
      showAlternatives?: boolean;
      addWaypoints?: boolean;
      lineOptions?: {
        styles?: Array<{ color?: string; weight?: number; opacity?: number }>;
      };
      createMarker?: (i: number, wp: Waypoint, n: number) => L.Marker | null;
      router?: any; // OSRM oder ORS Router
    }

    // Routing Control Funktion
    function control(options: RoutingControlOptions): L.Control;

    // OSRM Router
    function osrmv1(options: { serviceUrl?: string }): any;

    function mapbox(apiKey: string, options?: any): any;
  }
}
