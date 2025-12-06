export interface Ride {
  user_id: number;
  start_address: string,
  start_time: string,
  start_lat: number,
  start_lng: number,
  end_address: string,
  end_time: string,
  end_lat: number,
  end_lng: number,
  duration: string,
  distance: number;
  ride_type: string,
  ride_id: number,
  vehicle_id: number
  wholeRide: [number, number][]
}

