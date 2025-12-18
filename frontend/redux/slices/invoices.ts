import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
};

const invoices = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
    },
  },
});

export const { setBills } = invoices.actions;

export default invoices.reducer;
