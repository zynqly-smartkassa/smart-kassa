import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
//import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import Settings from "./pages/settings/Settings";
import Ride from "./pages/rides/Ride";
import AllRides from "./pages/rides/AllRides";

/**
 * The Routes are all declared here
 * @returns Router Component for Routing in the Application without reloading whole page
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* This will ensure, that each Route has the same Header */}
        <Route
          element={

            <RootLayout />

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
