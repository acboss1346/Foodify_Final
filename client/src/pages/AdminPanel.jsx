import { useEffect, useState } from "react";
import { API } from "../api";
import OrderManager from "../components/OrderManager";
import { useToast } from "../context/ToastContext";

export default function AdminPanel({ user, onLogout }) {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "Snacks" });
  const [activeTab, setActiveTab] = useState('orders');
  const { addToast } = useToast();

  useEffect(() => {
    if (activeTab === 'food') loadFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods?limit=1000");
      setFoods(res.data.data || res.data);
    } catch (err) {
      addToast("Error loading foods", "error");
    }
  };

  const addFood = async () => {
    if (!form.name || !form.price || !form.category) {
      addToast("Please fill in all fields.", "error");
      return;
    }
    try {
      await API.post("/foods", { ...form, price: Number(form.price) });
      addToast("Food Added Successfully! 🍔", "success");
      setForm({ name: "", price: "", category: "Snacks" });
      loadFoods();
    } catch {
      addToast("Error adding food. Check permissions.", "error");
    }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/foods/${id}`);
        addToast("Food item deleted.", "info");
        loadFoods();
      } catch (err) {
        addToast("Delete failed.", "error");
      }
    }
  };

  const isAdmin = user && user.role && user.role.toLowerCase() === 'admin';

  if (!isAdmin) {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto', borderColor: 'var(--color-error)' }}>
          <h2 style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>Access Denied 🔒</h2>
          <p style={{ marginBottom: '2rem' }}>You do not have permission to view this page.</p>
          <button onClick={onLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Admin Dashboard 🛡️</h2>
        <button
          onClick={onLogout}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: 'var(--border-subtle)', paddingBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('orders')}
          className="btn"
          style={{
            background: activeTab === 'orders' ? 'var(--color-primary)' : 'transparent',
            color: activeTab === 'orders' ? 'white' : 'var(--color-text-muted)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className="btn"
          style={{
            background: activeTab === 'food' ? 'var(--color-primary)' : 'transparent',
            color: activeTab === 'food' ? 'white' : 'var(--color-text-muted)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          Manage Menu Items
        </button>
      </div>

      {activeTab === 'orders' ? (
        <OrderManager />
      ) : (
        <>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Add New Item</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <input
                placeholder="Item Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ padding: '0.875rem 1rem', background: 'var(--color-bg-input)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-text-main)' }}
              >
                <option value="Snacks">Snacks</option>
                <option value="Meals">Meals</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <button onClick={addFood} className="btn btn-primary" style={{ width: '100%' }}>Add Item to Menu</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {foods.map((f) => (
              <div key={f.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{f.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{f.category} • <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>₹{f.price}</span></p>
                </div>
                <button onClick={() => deleteFood(f.id)}
                  className="btn btn-secondary"
                  style={{ color: 'var(--color-error)', borderColor: 'rgba(239, 68, 68, 0.2)', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}