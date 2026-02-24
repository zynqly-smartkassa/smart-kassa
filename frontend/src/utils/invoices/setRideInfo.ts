import { isMobile } from "@/hooks/layout/use-mobile";
import type { RideInfo } from "@/types/RideInfoForBill";
import { Preferences } from "@capacitor/preferences";

export const keyForRideInfo = "KEY_FOR_RIDE_INFO";

export const setRideInfo = {
  /**
   * Set RideInfo into secure storage
   */
  async setRideInfo(value: RideInfo): Promise<void> {
    if (isMobile) {
      await Preferences.set({
        key: keyForRideInfo,
        value: JSON.stringify(value),
      });
    } else {
      localStorage.setItem(keyForRideInfo, JSON.stringify(value));
    }
  },

  async getRideInfo(): Promise<RideInfo | null> {
    if (isMobile) {
      const { value } = await Preferences.get({ key: keyForRideInfo });
      return JSON.parse(value!) as RideInfo;
    } else {
      const rideInfo = localStorage.getItem(keyForRideInfo);
      if (rideInfo) {
        return JSON.parse(rideInfo) as RideInfo;
      } else {
        throw new Error("No Ride Info found in local Storage");
      }
    }
  },

  /**
   * Remove ride info
   */
  async removeRideInfo(): Promise<void> {
    if (isMobile) {
      await Preferences.remove({ key: keyForRideInfo });
    } else {
      localStorage.removeItem(keyForRideInfo);
    }
  },
};
