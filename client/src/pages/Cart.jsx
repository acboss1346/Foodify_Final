import { useEffect, useState } from "react";
import { API } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { loadCart(); }, []);

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      // Quietly fail or show toast if needed
    }
  };

  const updateQty = async (id, qty) => {
    if (qty <= 0) return;
    try {
      await API.put(`/cart/update/${id}`, { quantity: qty });
      loadCart();
    } catch {
      addToast("Failed to update quantity", "error");
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/remove/${id}`);
      loadCart();
      addToast("Item removed", "info");
    } catch {
      addToast("Failed to remove item", "error");
    }
  };

  const placeOrder = async () => {
    try {
      await API.post("/orders");
      addToast("Order placed successfully! 🚀", "success");
      setCart([]);
      setTimeout(() => navigate("/orders"), 500);
    } catch {
      addToast("Error placing order. Please try again.", "error");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        Your Cart <span style={{ color: "var(--color-success)" }}>🛍️</span>
      </h2>

      {cart.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Your cart is currently empty.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Start Ordering
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map((item) => (
            <div key={item.id} className="glass-card" style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.food.name}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>@ ₹{item.food.price}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--color-bg-input)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem'
                }}>
                  <button onClick={() => updateQty(item.id, item.quantity - 1)}
                    style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: 'transparent', color: 'var(--color-text-main)'
                    }}>
                    –
                  </button>
                  <span style={{ margin: '0 1rem', fontWeight: 600 }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)}
                    style={{
                      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: 'var(--color-bg-card-hover)', color: 'var(--color-text-main)'
                    }}>
                    +
                  </button>
                </div>

                <p style={{ fontSize: '1.1rem', fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
                  ₹{(item.food.price * item.quantity).toFixed(2)}
                </p>

                <button onClick={() => removeItem(item.id)}
                  style={{
                    padding: '0.5rem',
                    color: 'var(--color-error)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="glass-card" style={{
            marginTop: '2rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1.5rem',
            background: 'linear-gradient(to right, rgba(24, 24, 27, 0.6), rgba(24, 24, 27, 0.9))'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Total: <span style={{ color: 'var(--color-primary)', fontSize: '2rem', marginLeft: '0.5rem' }}>₹{total.toFixed(2)}</span>
            </p>
            <button
              onClick={placeOrder}
              className="btn btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
              Checkout Securely
            </button>
          </div>
        </div>
      )}
    </div>
  );
}