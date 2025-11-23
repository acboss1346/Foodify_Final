import { useEffect, useState } from "react";
import { API } from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);

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
      alert("Order placed!");
      loadCart();
    } catch {
      alert("Error placing order");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

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
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#10b981",
          marginBottom: "20px",
        }}
      >
        Your Cart
      </h2>

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "20px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "0.25s",
          }}
        >
          <h3
            style={{
              marginBottom: "6px",
              color: "#10b981",
              fontWeight: "600",
            }}
          >
            {item.food.name}
          </h3>

          <p style={{ margin: "4px 0", color: "#374151" }}>
            Price: ₹{item.food.price}
          </p>

          {/* Quantity Controls */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "14px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => updateQty(item.id, item.quantity - 1)}
              style={{
                padding: "8px 14px",
                background: "#e5ffe9",
                borderRadius: "8px",
                border: "1px solid #10b981",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "18px",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "#d2fce0")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "#e5ffe9")
              }
            >
              -
            </button>

            <p style={{ fontSize: "18px", fontWeight: "600" }}>
              {item.quantity}
            </p>

            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              style={{
                padding: "8px 14px",
                background: "#e5ffe9",
                borderRadius: "8px",
                border: "1px solid #10b981",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "18px",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "#d2fce0")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "#e5ffe9")
              }
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(item.id)}
            style={{
              marginTop: "14px",
              background: "#dc2626",
              color: "white",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.25s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "#b91c1c")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "#dc2626")
            }
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total + Place Order */}
      {cart.length > 0 && (
        <>
          <h3
            style={{
              marginTop: "20px",
              fontSize: "24px",
              color: "#0f5132",
              fontWeight: "600",
            }}
          >
            Total: ₹{total}
          </h3>

          <button
            onClick={placeOrder}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "14px",
              background: "#10b981",
              color: "white",
              borderRadius: "8px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.25s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "#0c9467")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "#10b981")
            }
          >
            Place Order
          </button>
        </>
      )}

      {cart.length === 0 && (
        <p style={{ color: "#6b7280", marginTop: "20px", fontSize: "18px" }}>
          Your cart is empty.
        </p>
      )}
    </div>
  );
}
