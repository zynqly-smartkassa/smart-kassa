import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = []

const drawnRideSlice = createSlice({
  name: "drawnRide",
  initialState,
  reducers: {
    addRide: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    }
  }
})

export const {addRide} = drawnRideSlice.actions;

export default drawnRideSlice.reducer;