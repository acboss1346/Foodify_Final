import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components & Pages
import FoodifyAuth from "./components/FoodifyAuth"; // Login/Signup UI
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";

// API Functions
import { getUser, logout } from "./api"; // <-- Ensure 'logout' is exported from api.js

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. INITIAL USER CHECK (on component mount) ---
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  // --- 2. LOGOUT HANDLER (FIX FOR ADMIN LOGOUT ISSUE) ---
  const handleLogout = async () => {
    try {
      // 1. Call API to clear the JWT cookie on the server
      await logout(); 
      
      // 2. Clear the client-side user state
      setUser(null);
      alert("Logged out successfully!");
      
      // The Navigate component in the Routes will redirect to "/" automatically
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
      // Even if the API call fails, clear the local state for a chance to re-login
      setUser(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      {/* 3. NAV BAR: Only render if logged in, passing the correct logout handler */}
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>

        {/* Home Route: Redirects to /home if logged in, otherwise shows AuthForm */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              // FoodifyAuth handles the actual login/signup logic and calls setUser on success
              <FoodifyAuth setUser={setUser} />
            )
          }
        />

        {/* Protected routes: Check if 'user' exists */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/menu"
          element={user ? <Menu /> : <Navigate to="/" replace />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/" replace />}
        />
        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/" replace />}
        />

        {/* Admin Protected Route: Check if user exists AND role is "admin" */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              // 4. Pass the central handleLogout to the AdminPanel component
              <AdminPanel onLogout={handleLogout} /> 
            ) : (
              // Redirect non-admins or unauthenticated users
              <Navigate to="/home" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}