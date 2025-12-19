import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const newNotificationsSlice = createSlice({
  name: "newNotifications",
  initialState,
  reducers: {
    invert: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    }
  }
})

export const { invert } = newNotificationsSlice.actions;
export default newNotificationsSlice.reducer;