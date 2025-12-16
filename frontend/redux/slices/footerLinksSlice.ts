import { createSlice } from "@reduxjs/toolkit";
import type { footerLinks } from "../../constants/Compontents";

const initialState = {
  linkIndex: 1 as footerLinks,
};

const footerLinksSlice = createSlice({
  name: "footer slice",
  initialState,
  reducers: {
    setLink: (state, action) => {
      state.linkIndex = action.payload;
    },
  },
});

export const { setLink } = footerLinksSlice.actions;

export default footerLinksSlice.reducer;
