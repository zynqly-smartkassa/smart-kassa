import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


export interface NotificationsArgs {
  id?: string,
  icon: string,
  title: string,
  desc: string,
  date: string,
  read: boolean,
  color: string
}

interface NotificationsState {
  items: NotificationsArgs[];
}

const initialState: NotificationsState = {
  items: []
};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<NotificationsArgs>) => {
        state.items.push(action.payload);
        localStorage.setItem("notifications", JSON.stringify(state.items));
      },
      prepare: (notification: Omit<NotificationsArgs, "id">) => ({
        payload: {
          ...notification,
          id: nanoid(), // 🔥 automatische ID
        },
      }),
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const found = state.items.find(n => n.id === action.payload)
      if (found) {
        found.read = true;
      }
    }
  }
})

export const { add, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;