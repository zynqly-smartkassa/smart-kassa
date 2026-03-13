import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import RootLayout from "./components/providers/RootLayout";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { StatusBar } from "@capacitor/status-bar";
import Ride from "./pages/rides/Ride";
import AllRides from "./pages/rides/AllRides";
import { isMobile } from "./hooks/layout/use-mobile";
import Invoices from "./pages/invoices/Invoices";
import { ProtectedRoute } from "./components/providers/ProtectedRoute";
import Payment from "./pages/invoices/Payment";
import Documentation from "./pages/Documentation";
import Help from "./pages/Help";
import SingleInvoice from "./pages/invoices/SingleInvoice";

/**
 * The Routes are all declared here
 * @returns Router Component for Routing in the Application without reloading whole page
 */

function App() {
  /**
   * to set the Statusbar Color on the Mobile App
   */
  useEffect(() => {
    if (isMobile) {
      StatusBar.setBackgroundColor({ color: "#000000" });
    }
  }, []);

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
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/all-rides" element={<AllRides />}>
            <Route path=":id" element={<AllRides />} />
          </Route>
          <Route path="/invoices" element={<Invoices />}>
            <Route path=":id" element={<SingleInvoice />} />
          </Route>
          <Route path="/payment" element={<Payment />}>
            <Route path=":id" element={<Payment />} />
          </Route>
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
