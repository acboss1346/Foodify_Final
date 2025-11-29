import { useEffect, useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom"; 

// --- ICON PLACEHOLDERS ---
const ICON_TRASH = '🗑️'; 

export default function Cart() {
  const [cart, setCart] = useState([]);
  const primaryGreen = "#10b981";
  const dangerRed = "#dc2626";

  const loadCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (id, qty) => {
    if (qty <= 0) return;
    await API.put(`/cart/update/${id}`, { quantity: qty });
    loadCart();
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/remove/${id}`);
    loadCart();
  };

  const placeOrder = async () => {
    try {
      await API.post("/orders");
      alert("Order placed! You can track its status now.");
      setCart([]); 
      setTimeout(() => {
        window.location.href = "/orders"; 
      }, 500); 
    } catch {
      alert("Error placing order. Please log in or check cart contents.");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const totalBoxStyle = {
    padding: "20px",
    borderRadius: "14px",
    background: "#ecfdf5", // Lighter green background for distinction
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginTop: "25px",
    textAlign: "right",
    border: `2px solid ${primaryGreen}`, // Stronger border
  };

  return (
    <div
      style={{
        padding: "120px 30px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #f3fff9 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          fontWeight: "900", // Increased font weight for impact
          color: primaryGreen,
          marginBottom: "30px",
          textAlign: 'center',
          // 💡 FIXED: Removed explicit font family to use global/Inter font
        }}
      >
        Your Order Summary 🛍️
      </h2>

      {cart.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", background: 'white', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.07)' }}>
          <p style={{ color: "#6b7280", fontSize: "18px", marginBottom: "20px" }}>
            Your cart is feeling empty. Ready to grab some snacks?
          </p>
          <Link to="/menu" style={{ textDecoration: 'none' }}>
            <button 
                style={{ 
                    padding: '12px 30px', 
                    background: primaryGreen, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#0a8c60'}
                onMouseLeave={(e) => e.currentTarget.style.background = primaryGreen}
            >
                Start Ordering Now
            </button>
          </Link>
        </div>
      )}

      {/* Cart Items List */}
      {cart.length > 0 && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.2s",
                borderLeft: `5px solid ${primaryGreen}`
              }}
            >
              {/* Item Info */}
              <div style={{ flex: 1, textAlign: 'left', minWidth: '150px' }}>
                <h3 style={{ margin: "0 0 4px 0", color: "#1f2937", fontWeight: "700", fontSize: '20px' }}>
                  {item.food.name}
                </h3>
                <p style={{ margin: "0", color: "#6b7280", fontSize: '14px' }}>
                  @ ₹{item.food.price}
                </p>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px", // Reduced gap
                  flexShrink: 0,
                }}
              >
                {/* Quantity Controls (Pill Box Style) */}
                <div style={{ display: "flex", alignItems: "center", border: `1px solid ${primaryGreen}`, borderRadius: '20px', overflow: 'hidden' }}>
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    style={{ background: 'white', color: dangerRed, padding: '6px 12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 18, transition: '0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fcfcfc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                  >
                    –
                  </button>

                  <p style={{ fontSize: "16px", fontWeight: "700", margin: "0 5px", color: primaryGreen }}>
                    {item.quantity}
                  </p>

                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    style={{ background: 'white', color: primaryGreen, padding: '6px 12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 18, transition: '0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fcfcfc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                  >
                    +
                  </button>
                </div>
                
                {/* Subtotal */}
                <p style={{ margin: 0, color: "#1f2937", fontWeight: "600", fontSize: '18px', width: '80px', textAlign: 'right' }}>
                  ₹{(item.food.price * item.quantity).toFixed(2)}
                </p>
                
                {/* Remove Icon/Button */}
                <button
                    onClick={() => removeItem(item.id)}
                    style={{
                        background: 'transparent',
                        color: dangerRed,
                        border: 'none',
                        fontSize: '20px', 
                        cursor: 'pointer',
                        padding: '5px',
                        marginLeft: '10px',
                    }}
                    title="Remove Item"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#b91c1c')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = dangerRed)}
                >
                    {ICON_TRASH}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total + Place Order */}
      {cart.length > 0 && (
        <div style={totalBoxStyle}>
          <p
            style={{
              fontSize: "28px", // Increased size
              color: "#059669", // Darker green for total
              fontWeight: "900",
              margin: '0 0 20px 0',
            }}
          >
            Order Total: ₹{total.toFixed(2)}
          </p>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              padding: "18px", // More padding for prominence
              background: primaryGreen,
              color: "white",
              borderRadius: "10px",
              fontSize: "19px",
              border: "none",
              cursor: "pointer",
              fontWeight: "700",
              transition: "0.25s",
              boxShadow: '0 6px 15px rgba(16,185,129,0.4)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0c9467')}
            onMouseLeave={(e) => (e.currentTarget.style.background = primaryGreen)}
          >
            Confirm & Secure Checkout
          </button>
        </div>
      )}
    </div>
  );
}