import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import RootLayout from "./layout/RootLayout";
import Settings from "./pages/settings/Settings";
import { useEffect } from "react";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import Ride from "./pages/rides/Ride";
import AllRides from "./pages/rides/AllRides";
import { ProtectedRoute } from "./components/ProtectedRoute";

/**
 * The Routes are all declared here
 * @returns Router Component for Routing in the Application without reloading whole page
 */

function App() {
  const isMobile = Capacitor.isNativePlatform();

  /**
   * to set the Statusbar Color on the Mobile App
   */
  useEffect(() => {
    if (isMobile) {
      StatusBar.setBackgroundColor({ color: "#000000" });
    }
  }, [isMobile]);

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
          <Route path="/ride" element={<Ride />} />
          <Route path="/all-rides" element={<AllRides />}>
            <Route path=":id" element={<AllRides />} />
          </Route>
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
