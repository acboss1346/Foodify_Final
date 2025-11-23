import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import OrderManager from "../components/OrderManager"; // <-- NEW IMPORT for Order Management

// The AdminPanel component now accepts the 'onLogout' prop from App.jsx
export default function AdminPanel({ onLogout }) { 
  // State for Food Management
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  
  // State to switch between views. Default to 'orders' since it's the new main feature.
  const [activeTab, setActiveTab] = useState('orders'); 

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.log("Error loading foods:", err);
    }
  };

  // Only load foods when the 'food' tab is active
  useEffect(() => {
    if (activeTab === 'food') {
      loadFoods();
    }
    // The OrderManager handles its own data loading and refreshing.
  }, [activeTab]); 

  const addFood = async () => {
    if (!name || !price || !category) {
      // Use a better UI notification instead of alert() in production
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
      loadFoods(); // Refresh food list
    } catch {
      alert("Error adding food. Are you logged in as admin?");
    }
  };

  const deleteFood = async (id) => {
    try {
      await API.delete(`/foods/${id}`);
      alert("Food deleted!");
      loadFoods(); // Refresh food list
    } catch {
      alert("Delete failed. Only admin can delete.");
    }
  };

  return (
    <div
      style={{
        padding: "120px 30px",
        maxWidth: "1000px", // Increased width to fit orders content better
        margin: "0 auto",
        background: "linear-gradient(180deg, #f3fff9 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header with Logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#10b981" }}>Admin Panel</h2>
        <button
          onClick={onLogout} // Uses the correct global logout prop
          style={{
            padding: "10px 16px",
            background: "#dc2626",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Logout
        </button>
      </div>
      
      {/* Tabs for Navigation */}
      <div style={{ 
          display: 'flex', 
          borderBottom: '2px solid #e5e7eb', 
          marginBottom: '30px', 
          backgroundColor: 'white',
          borderRadius: '12px 12px 0 0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
          <button 
            onClick={() => setActiveTab('orders')} 
            style={{ 
              padding: '12px 20px', 
              fontSize: '16px', 
              fontWeight: 600,
              background: activeTab === 'orders' ? '#10b981' : 'transparent',
              color: activeTab === 'orders' ? 'white' : '#6b7280',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '12px 0 0 0',
              transition: '0.2s',
              // Visual indicator for the active tab
              boxShadow: activeTab === 'orders' ? 'inset 0 -4px 0 0 #047857' : 'none'
            }}
          >
            Order Management
          </button>
          <button 
            onClick={() => setActiveTab('food')} 
            style={{ 
              padding: '12px 20px', 
              fontSize: '16px', 
              fontWeight: 600,
              background: activeTab === 'food' ? '#10b981' : 'transparent',
              color: activeTab === 'food' ? 'white' : '#6b7280',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0 12px 0 0',
              transition: '0.2s',
              // Visual indicator for the active tab
              boxShadow: activeTab === 'food' ? 'inset 0 -4px 0 0 #047857' : 'none'
            }}
          >
            Food Management
          </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'orders' && (
        // New Component handles fetching and updating orders
        <OrderManager /> 
      )}

      {activeTab === 'food' && (
        <>
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
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "12px", fontSize: "15px" }} />
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
        </>
      )}
    </div>
  );
}