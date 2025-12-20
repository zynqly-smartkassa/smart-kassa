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

export interface SettingsArgs {
  notifications: {
    achievements: boolean;
    news: boolean
  }
}

interface NotificationsState {
  items: NotificationsArgs[];
  items_archived: NotificationsArgs[];
  activeSettings: SettingsArgs;
}

export type NotificationSettingKey = keyof SettingsArgs["notifications"];

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

const loadNotificationsSettings = (): SettingsArgs => {
  try {
    const raw = localStorage.getItem("notifications_settings");
    if (!raw) return {
      notifications: {
        achievements: true,
        news: true
      }
    };
    return JSON.parse(raw) as SettingsArgs;
  } catch (err) {
    console.error("Failed to load notifications from localStorage", err);
    return {
      notifications: {
        achievements: true,
        news: true
      }
    }
  };
}

const initialState: NotificationsState = {
  items: loadNotifications(),
  items_archived: loadNotificationsArchiv(),
  activeSettings: loadNotificationsSettings()
};


const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationsArgs>) => {
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
    clearAllArchived: (state) => {
      state.items_archived = [];
    },
    clearAllSettings: (state) => {
      state.activeSettings = {
        notifications: {
          achievements: true,
          news: true
        }
      };
    },
    deleteNotifications: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(ride => ride.id !== action.payload);
    },
    enableSetting: (state, action: PayloadAction<NotificationSettingKey>) => {
      const key = action.payload;
      state.activeSettings.notifications[key] = true;
      console.log(`Set key ${key} (from: false) tooooo: true `)
      console.log("Value now:", state.activeSettings.notifications[key])
    },
    disableSetting: (state, action: PayloadAction<NotificationSettingKey>) => {
      const key = action.payload;
      state.activeSettings.notifications[key] = false;
      console.log(`Set key ${key} (from: true) tooooo: false `)
      console.log("Value now:", state.activeSettings.notifications[key])
    }
  }
})

export const { addNotification, markAsRead, clearAll, deleteNotifications,
  enableSetting, disableSetting, clearAllArchived, clearAllSettings } = notificationsSlice.actions;
export default notificationsSlice.reducer;