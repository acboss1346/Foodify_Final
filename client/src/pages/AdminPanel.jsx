import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

// 1. Component now accepts 'onLogout' from App.jsx
export default function AdminPanel({ onLogout }) { 
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // Still needed for internal navigation

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.log("Error loading foods:", err);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const addFood = async () => {
    if (!name || !price || !category) {
      alert("Please fill all fields");
      return;
    }
    try {
      await API.post("/foods", {
        name,
        price: Number(price),
        category,
      });
      alert("Food added!");
      setName("");
      setPrice("");
      setCategory("");
      loadFoods();
    } catch {
      alert("Error adding food. Are you logged in as admin?");
    }
  };

  const deleteFood = async (id) => {
    try {
      await API.delete(`/foods/${id}`);
      alert("Food deleted!");
      loadFoods();
    } catch {
      alert("Delete failed. Only admin can delete.");
    }
  };
  
  // 🚨 2. REMOVED THE FAULTY logoutAdmin function here 🚨

  return (
    <div
      style={{
        padding: "120px 30px",
        maxWidth: "900px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #f3fff9 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header with Logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#10b981" }}>Admin Panel</h2>
        <button
          // 3. Use the correct onLogout prop
          onClick={onLogout}
          style={{
            padding: "10px 16px",
            background: "#dc2626",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: "#555", marginBottom: "25px" }}>
        Manage menu items (Add / Delete food)
      </p>

      {/* Add Food Card */}
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          transition: "0.2s",
        }}
      >
        <h3 style={{ color: "#10b981", marginBottom: "16px" }}>Add New Food Item</h3>
        <input placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "12px", fontSize: "15px" }} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "12px", fontSize: "15px" }} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "12px", fontSize: "15px" }} />
        <button onClick={addFood} style={{ width: "100%", padding: "12px", background: "#10b981", color: "white", borderRadius: "8px", fontSize: "16px", fontWeight: "600", border: "none", cursor: "pointer", transition: "0.25s" }}>Add Food</button>
      </div>

      {/* Existing Foods */}
      <h3 style={{ marginBottom: "18px", fontSize: "24px", fontWeight: "600", color: "#0f5132" }}>Existing Items</h3>
      {foods.map((f) => (
        <div key={f.id} style={{ background: "white", padding: "18px", borderRadius: "12px", marginBottom: "14px", boxShadow: "0 3px 10px rgba(0,0,0,0.07)" }}>
          <h3 style={{ marginBottom: "6px", color: "#10b981" }}>{f.name}</h3>
          <p style={{ margin: "3px 0", color: "#374151" }}>₹{f.price}</p>
          <p style={{ margin: "3px 0", color: "#6b7280" }}>Category: <b>{f.category}</b></p>
          <button onClick={() => deleteFood(f.id)} style={{ marginTop: "10px", background: "#dc2626", color: "white", padding: "10px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}