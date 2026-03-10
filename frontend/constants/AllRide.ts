export interface AllRide {
  ride_id: number,
  vehicle_id: number,
  user_id: number;
  start_address: string,
  start_time: string,
  end_address: string,
  end_time: string,
  duration: string,
  distance: number,
  ride_type: string,
  whole_ride: [number, number][]
}