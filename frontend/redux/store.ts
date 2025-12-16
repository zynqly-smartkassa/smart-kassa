import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: { toastState: toastSlice, user: userSlice,
    authState: authSlice
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
