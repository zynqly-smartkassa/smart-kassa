import { createSlice } from "@reduxjs/toolkit";
import type { USER_DTO } from "../../constants/User";

const initialState: USER_DTO = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
    signOutUser: (state) => {
      state.id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = "";
    },
    updateUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
  },
});

export const { signInUser, signOutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
