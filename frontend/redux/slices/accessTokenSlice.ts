import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accesstoken: "",
};

const accessTokenSlice = createSlice({
  name: "access token",
  initialState,
  reducers: {
    setAccessTokenState: (state, action) => {
      state.accesstoken = action.payload.accessToken;
    },
    clearAccessTokenState: (state) => {
      state.accesstoken = "";
    },
  },
});

export const {
  setAccessTokenState: setAccessTokenState,
  clearAccessTokenState: clearAccessTokenState,
} = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
