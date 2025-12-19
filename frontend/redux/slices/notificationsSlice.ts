import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface NotificationsArgs {
  id: string,
  icon: string,
  title: string,
  desc: string,
  date: string,
  read: boolean,
  color: string
}

interface NotificationsState {
  items: NotificationsArgs[];
  items_archived: NotificationsArgs[]
}

// Load from localstorage
const loadNotifications = (): NotificationsArgs[] => {
  try {
    const raw = localStorage.getItem("notifications");
    if (!raw) return [];
    return JSON.parse(raw) as NotificationsArgs[];
  } catch (err) {
    console.error("Failed to load notifications from localStorage", err);
    return [];
  }
};

const loadNotificationsArchiv = (): NotificationsArgs[] => {
  try {
    const raw = localStorage.getItem("notifications_archived");
    if (!raw) return [];
    return JSON.parse(raw) as NotificationsArgs[];
  } catch (err) {
    console.error("Failed to load notifications from localStorage", err);
    return [];
  }
};

const initialState: NotificationsState = {
  items: loadNotifications(),
  items_archived: loadNotificationsArchiv()
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<NotificationsArgs>) => {
        state.items.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const found = state.items.find(n => n.id === action.payload)
      if (found) {
        found.read = true;
        state.items_archived.push(found)
      }
    },
    clearAll: (state) => {
      state.items = [];
    },
    deleteOne: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(ride => ride.id !== action.payload);
    } 
  }
})

export const { add, markAsRead, clearAll, deleteOne } = notificationsSlice.actions;
export default notificationsSlice.reducer;