import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import drawnRideSlice from "./slices/rideSlice";

export const store = configureStore({
  reducer: { toastState: toastSlice, user: userSlice,
    authState: authSlice, drawnRideState: drawnRideSlice
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
