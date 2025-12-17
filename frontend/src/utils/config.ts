
// You can decide here if you want to use "demo" or "mapbox"

export const ROUTING_CONFIG = {
  mode: "mapbox", // use "demo" for testing
  demo: {
    serviceUrl: "https://router.project-osrm.org/route/v1",
  },
  mapbox: {
    apiKey: import.meta.env.VITE_TOKEN,
  },
};

