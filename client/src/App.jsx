import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import FoodifyAuth from "./components/FoodifyAuth";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<FoodifyAuth setUser={setUser} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminPanel />} />
        
      </Routes>
    </BrowserRouter>
  );
}
