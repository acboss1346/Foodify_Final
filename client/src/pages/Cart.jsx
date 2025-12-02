import { useEffect, useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => { loadCart(); }, []);

  const loadCart = async () => { const res = await API.get("/cart"); setCart(res.data); };
  const updateQty = async (id, qty) => { if (qty <= 0) return; await API.put(`/cart/update/${id}`, { quantity: qty }); loadCart(); };
  const removeItem = async (id) => { await API.delete(`/cart/remove/${id}`); loadCart(); };

  const placeOrder = async () => {
    try { await API.post("/orders"); alert("Order placed!"); setCart([]); setTimeout(() => window.location.href = "/orders", 500); }
    catch { alert("Error placing order."); }
  };

  const total = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        Your Cart <span style={{ color: "var(--color-success)" }}>🛍️</span>
      </h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-empty-text">Cart is empty.</p>
          <Link to="/menu" className="btn btn-secondary" style={{ textDecoration: 'none', color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.food.name}</h3>
                <p className="cart-item-price">@ ₹{item.food.price}</p>
              </div>

              <div className="cart-item-actions">
                <div className="qty-controls">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="qty-btn minus">–</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="qty-btn plus">+</button>
                </div>

                <p className="item-total">₹{(item.food.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)} className="remove-btn">🗑️</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p className="cart-total">Total: <span>₹{total.toFixed(2)}</span></p>
            <button onClick={placeOrder} className="checkout-btn">Checkout Securely</button>
          </div>
        </div>
      )}
    </div>
  );
}