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

export interface NotificationType {
  inlineSlider: {
    achievements: boolean;
    news: boolean;
  };
  emails: {
    twoFactor: boolean;
  };
}

interface NotificationsState {
  items: NotificationsArgs[];
  items_archived: NotificationsArgs[];
  activeSettings: NotificationType;
}

export type ToggleSettingPayload =
   {
    section: "inlineSlider";
    sectionKey: keyof NotificationType["inlineSlider"];
    value: boolean;
  }
  | {
    section: "emails";
    sectionKey: keyof NotificationType["emails"];
    value: boolean;
  };

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

const defaultSettings: NotificationType = {
  inlineSlider: {
    achievements: true,
    news: true
  },
  emails: {
    twoFactor: true
  }
}

const loadNotificationsSettings = (): NotificationType => {
  try {
    const raw = localStorage.getItem("notifications_settings");
    if (!raw) return defaultSettings;
    return JSON.parse(raw) as NotificationType;
  } catch (err) {
    console.error("Failed to load notifications from localStorage", err);
    return defaultSettings;
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
      state.activeSettings = defaultSettings;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(ride => ride.id !== action.payload);
    },
    toggleSetting: (state, action: PayloadAction<ToggleSettingPayload>) => {
      const { section, sectionKey, value } = action.payload;

      if (section === "inlineSlider") {
        state.activeSettings.inlineSlider[sectionKey] = value;
      }

      if (section === "emails") {
        state.activeSettings.emails[sectionKey] = value;
      }
    },
  }
})

export const { addNotification, markAsRead, clearAll, deleteNotification,
  toggleSetting, clearAllArchived, clearAllSettings } = notificationsSlice.actions;
export default notificationsSlice.reducer;