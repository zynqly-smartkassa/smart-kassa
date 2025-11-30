import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
//import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import Settings from "./pages/settings/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

/**
 * The Routes are all declared here
 * @returns Router Component for Routing in the Application without reloading whole page
 */
function App() {
  const isCapacitor =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof window !== "undefined" && (window as any).Capacitor !== undefined;

  useEffect(() => {
    if (!isCapacitor) return;

    const checkThemeAndSetStatusBar = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");

      if (isDarkMode) {
        StatusBar.setStyle({ style: Style.Light });
      } else {
        StatusBar.setStyle({ style: Style.Dark });
      }
    };

    checkThemeAndSetStatusBar();

    const observer = new MutationObserver(checkThemeAndSetStatusBar);

    // Beobachtet Änderungen an Attributen (Klassen) des HTML-Elements
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup-Funktion für den Observer
    return () => {
      observer.disconnect();
    };
  }, [isCapacitor]);

  return (
    <Router>
      <Routes>
        {/* This will ensure, that each Route has the same Header */}

        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
