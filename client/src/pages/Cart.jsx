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

  async function updateQty(id, qty) {
    if (qty <= 0) return;

    await API.put(`/cart/update/${id}`, { quantity: qty });
    loadCart();
  }

  async function removeItem(id) {
    await API.delete(`/cart/remove/${id}`);
    loadCart();
  }

  async function placeOrder() {
    try {
      await API.post("/orders");
      alert("Order placed!");
      loadCart();
    } catch {
      alert("Error placing order");
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div className="menu-card" key={item.id}>
          <h3>{item.food.name}</h3>
          <p>Price: ₹{item.food.price}</p>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
          </div>

          <button
            style={{ marginTop: "10px", background: "#dc2626" }}
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button className="submit-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}


