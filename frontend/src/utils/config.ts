
/**
 * Configuration object for the routing service used by Leaflet Routing Machine.
 * 
 * This configuration allows switching between two routing providers:
 * - "demo": Uses the free OSRM demo server (for testing only, not production-ready)
 * - "mapbox": Uses Mapbox routing service (requires API key, production-ready)
 * 
 * @property {string} mode - The active routing mode ("demo" or "mapbox").
 * @property {Object} demo - Configuration for OSRM demo mode.
 * @property {string} demo.serviceUrl - The OSRM demo service URL.
 * @property {Object} mapbox - Configuration for Mapbox mode.
 * @property {string} mapbox.apiKey - The Mapbox API key from environment variables.
 */
export const ROUTING_CONFIG = {
  mode: "mapbox", // use "demo" for testing
  demo: {
    serviceUrl: "https://router.project-osrm.org/route/v1",
  },
  mapbox: {
    apiKey: import.meta.env.VITE_TOKEN,
  },
};

