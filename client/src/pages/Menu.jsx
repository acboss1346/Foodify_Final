import { useEffect, useState } from "react";
import { API } from "../api";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/foods").then((res) => setItems(res.data))
      .catch(() => alert("Failed to load menu"))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (foodId) => {
    try {
      await API.post("/cart/add", { foodId, quantity: 1 });
      alert("Added to cart!");
    } catch { alert("Failed to add to cart"); }
  };

  if (loading) return (
    <div className="loading-screen">
      Loading snacks...
    </div>
  );

  return (
    <div className="menu-container">
      <h2 className="menu-title">
        Today's <span>Menu</span> 🍔
      </h2>

      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-card">
            <div>
              <h3 className="menu-item-name">
                {item.name}
              </h3>
              <span className="menu-item-category">
                {item.category}
              </span>
            </div>

            <div>
              <div className="menu-item-price">
                ₹{item.price}
              </div>

              <button
                onClick={() => addToCart(item.id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}