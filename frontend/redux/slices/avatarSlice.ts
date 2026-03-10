import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatarState: (state, action) => {
      state.url = action.payload;
    },
    clearAvatarState: (state) => {
      state.url = "";
    },
  },
});

export const { setAvatarState } = avatarSlice.actions;

export default avatarSlice.reducer;
