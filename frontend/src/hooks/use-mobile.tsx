import { Capacitor } from "@capacitor/core";
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

/**
 * To see if the User is on the Mobile Phone or on the Web
 * (Web Browser on Mobile is still classified as Web, only Mobile Application is App)
 * @returns true if on Mobile Application, false if on Web Browser
 */
export const isMobile = Capacitor.isNativePlatform();
