import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
//import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import Settings from "./pages/settings/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
