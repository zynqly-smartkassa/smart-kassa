import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Ride } from "../../constants/Ride"; // Update the path to match your project structure


const initialState: Ride[] = [];

const allRidesSlice = createSlice({
  name: "allRides",
  initialState,
  reducers: {
     add(state, action: PayloadAction<Omit<Ride, "ride_id">>) {
      const newRide = {
        ...action.payload,
        ride_id: state.length > 0 ? state[state.length - 1].ride_id + 1 : 1, // auto-increment
      };
      state.push(newRide);
    }
  }
})

export const {
  add
} = allRidesSlice.actions

export default allRidesSlice.reducer;