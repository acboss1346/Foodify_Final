import { useEffect, useState } from "react";
import { API } from "../api";
import OrderManager from "../components/OrderManager";

export default function AdminPanel({ user, onLogout }) {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (activeTab === 'food') loadFoods();
  }, [activeTab]);

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods?limit=1000");
      setFoods(res.data.data || res.data);
    } catch (err) {
      console.error("Error loading foods", err);
    }
  };

  const addFood = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await API.post("/foods", { ...form, price: Number(form.price) });
      alert("Food Added Successfully!");
      setForm({ name: "", price: "", category: "" });
      loadFoods();
    } catch {
      alert("Error adding food. Ensure you are logged in as Admin.");
    }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/foods/${id}`);
        loadFoods();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Delete failed.");
      }
    }
  };

  const isAdmin = user && user.role && user.role.toLowerCase() === 'admin';

  if (!isAdmin) {
    return (
      <div className="access-denied">
        <h2>Access Denied 🔒</h2>
        <p>User: {user?.username}</p>
        <p>Role: {user?.role || "None detected"}</p>
        <button onClick={onLogout} className="relogin-btn">
          Logout & Relogin
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button
          onClick={onLogout}
          className="admin-logout-btn"
        >
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
        >
          Menu Items
        </button>
      </div>

      {activeTab === 'orders' ? (
        <OrderManager />
      ) : (
        <>
          <div className="add-food-card">
            <h3 className="add-food-title">Add New Item</h3>
            <div className="form-grid">
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="auth-input"
                style={{ marginBottom: 0 }}
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="auth-input"
                style={{ marginBottom: 0 }}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="auth-input"
                style={{ marginBottom: 0 }}
              />
            </div>
            <button onClick={addFood} className="add-btn">Add Item</button>
          </div>

          <div className="food-list">
            {foods.map((f) => (
              <div key={f.id} className="food-item">
                <div className="food-info">
                  <h4>{f.name}</h4>
                  <span className="food-meta">{f.category} — <span className="food-price">₹{f.price}</span></span>
                </div>
                <button onClick={() => deleteFood(f.id)} className="delete-btn">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}