import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components & Pages
import FoodifyAuth from "./components/FoodifyAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";

// API Functions
import { getUser, logout } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. INITIAL USER CHECK ---
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        // Ensure we handle the nested structure correctly based on your backend response
        setUser(res.data.user || res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // --- 2. LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      // Optional: alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null); // Force local logout anyway
    }
  };

  // --- 3. LOADING SCREEN (Dark Theme) ---
  if (loading) return (
    <div className="loading-screen">
      Loading Foodify...
    </div>
  );

  return (
    <BrowserRouter>
      {/* Navbar shows only when logged in */}
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* LOGIN / SIGNUP */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <FoodifyAuth setUser={setUser} />
          }
        />

        {/* PROTECTED USER ROUTES */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/menu" element={user ? <Menu /> : <Navigate to="/" replace />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" replace />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" replace />} />

        {/* --- ADMIN ROUTE FIX --- 
            1. Safe Role Check: user?.role?.toLowerCase() handles "Admin" vs "admin"
            2. PROP FIX: Added `user={user}` so AdminPanel can see who is logged in.
        */}
        <Route
          path="/admin"
          element={
            user && user.role && user.role.toLowerCase() === "admin" ? (
              <AdminPanel user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}