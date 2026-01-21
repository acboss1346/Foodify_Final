import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import FoodifyAuth from "./components/FoodifyAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";
import { ToastProvider } from "./context/ToastContext";

import { getUser, logout } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        setUser(res.data.user || res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
    }
  };

  if (loading) return (
    <div className="loading-screen">
      Loading Foodify...
    </div>
  );

  return (
    <ToastProvider>
      <BrowserRouter>
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" replace /> : <FoodifyAuth setUser={setUser} />
            }
          />

          <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
          <Route path="/menu" element={user ? <Menu /> : <Navigate to="/" replace />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" replace />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" replace />} />
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}