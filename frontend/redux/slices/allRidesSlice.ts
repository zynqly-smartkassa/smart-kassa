import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 

interface Ride {
  start_address: string,
  start_time: string,
  start_lat: string,
  start_lng: string,
  end_address: string,
  end_time: string,
  end_lat: string,
  end_lng: string,
  duration: string,
  distance: string;
  rideID: string,
  car: string,
  ride_type: string,
  wholeRide: [number, number][]
}

const initialState: Ride[] = [];

const allRidesSlice = createSlice({
  name: "allRides",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Ride>) {
      state.push(action.payload);
    }
  }
})

export const {
  add
} = allRidesSlice.actions

export default allRidesSlice.reducer;