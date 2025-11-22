import { useEffect, useState } from "react";
import { API } from "../api";

export default function Menu() {
  const [items, setItems] = useState([]);

  // Load menu items
  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await API.get("/foods");
        setItems(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log("API failed → using fallback items");
        setItems([
          { id: 1, name: "Burger", price: 120, category: "fast" },
          { id: 2, name: "Pizza Slice", price: 90, category: "fast" },
          { id: 3, name: "Cold Coffee", price: 70, category: "drink" },
          { id: 4, name: "French Fries", price: 60, category: "fast" },
          { id: 5, name: "Momos", price: 80, category: "snack" },
          { id: 6, name: "Chai", price: 20, category: "drink" },
        ]);
      }
    }

    loadMenu();
  }, []);

  // Add to cart handler
  async function addToCart(foodId) {
    try {
      await API.post("/cart/add", { foodId, quantity: 1 });
      alert("Added to cart!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Please login first.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu</h2>

      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-card">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button
              className="submit-btn"
              onClick={() => addToCart(item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


