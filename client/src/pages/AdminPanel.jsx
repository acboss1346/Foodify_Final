import { useEffect, useState } from "react";
import { API } from "../api";
import OrderManager from "../components/OrderManager"; 

export default function AdminPanel({ user, onLogout }) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState('orders'); 
  const primaryGreen = "#10b981";
  const darkGreen = "#0f5132";
  const dangerRed = "#dc2626";

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.log("Error loading foods:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'food') {
      loadFoods();
    }
  }, [activeTab]); 

  const addFood = async () => {
    if (!name || !price || !category) {
      alert("Please fill all required fields"); 
      return;
    }
    try {
      await API.post("/foods", {
        name,
        price: Number(price),
        category,
      });
      alert("Food added successfully!");
      setName("");
      setPrice("");
      setCategory("");
      loadFoods(); 
    } catch {
      alert("Error adding food. Admin access required.");
    }
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    try {
      await API.delete(`/foods/${id}`);
      loadFoods();
    } catch {
      alert("Delete failed. Only admin can delete.");
    }
  };

  const tabButtonStyle = (isActive) => ({
    padding: '12px 20px', 
    fontSize: '16px', 
    fontWeight: 600,
    background: isActive ? primaryGreen : 'transparent',
    color: isActive ? 'white' : '#6b7280',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s',
    boxShadow: isActive ? 'inset 0 -4px 0 0 #047857' : 'none'
  });

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "12px",
    fontSize: "15px",
    boxSizing: "border-box",
  };
  
  // Security check: Only show admin panel if user role is admin
  if (user && user.role !== 'admin') {
      return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Access Denied.</div>;
  }


  return (
    <div
      style={{
        padding: "120px 30px",
        maxWidth: "1000px", 
        margin: "0 auto",
        background: "linear-gradient(180deg, #f3fff9 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header with Logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: primaryGreen }}>Admin Panel</h2>
        <button
          onClick={onLogout} 
          style={{
            padding: "10px 18px",
            background: dangerRed,
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#b91c1c')}
          onMouseLeave={(e) => (e.currentTarget.style.background = dangerRed)}
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
                ...tabButtonStyle(activeTab === 'orders'),
                borderRadius: '12px 0 0 0',
            }}
          >
            Order Management
          </button>
          <button 
            onClick={() => setActiveTab('food')} 
            style={{ 
                ...tabButtonStyle(activeTab === 'food'),
                borderRadius: '0 12px 0 0',
            }}
          >
            Food Management
          </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'orders' && (
        <OrderManager /> 
      )}

      {activeTab === 'food' && (
        <>
          <p style={{ color: "#555", marginBottom: "25px", fontSize: '16px' }}>
            Manage menu items (Add / Delete food)
          </p>

          {/* Add Food Card */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              marginBottom: "30px",
              borderTop: `4px solid ${primaryGreen}`,
            }}
          >
            <h3 style={{ color: darkGreen, marginBottom: "16px", fontSize: '24px' }}>Add New Food Item</h3>
            <input placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
            
            <button 
              onClick={addFood} 
              style={{ 
                width: "100%", 
                padding: "14px", 
                background: primaryGreen, 
                color: "white", 
                borderRadius: "8px", 
                fontSize: "18px", 
                fontWeight: "700", 
                border: "none", 
                cursor: "pointer", 
                transition: "0.25s" 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0a8c60')}
              onMouseLeave={(e) => (e.currentTarget.style.background = primaryGreen)}
            >
              Add Food
            </button>
          </div>

          {/* Existing Foods List */}
          <h3 style={{ marginBottom: "18px", fontSize: "24px", fontWeight: "700", color: darkGreen }}>Existing Items ({foods.length})</h3>
          {foods.map((f) => (
            <div 
              key={f.id} 
              style={{ 
                background: "white", 
                padding: "18px", 
                borderRadius: "12px", 
                marginBottom: "14px", 
                boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div>
                    <h4 style={{ margin: "0 0 4px 0", color: darkGreen, fontSize: '18px' }}>{f.name}</h4>
                    <p style={{ margin: "0", color: "#374151", fontWeight: 600 }}>₹{f.price} | Category: {f.category}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteFood(f.id)} 
                style={{ 
                  background: dangerRed, 
                  color: "white", 
                  padding: "8px 16px", 
                  borderRadius: "6px", 
                  border: "none", 
                  cursor: "pointer", 
                  fontWeight: 600,
                  transition: '0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#b91c1c')}
                onMouseLeave={(e) => (e.currentTarget.style.background = dangerRed)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}