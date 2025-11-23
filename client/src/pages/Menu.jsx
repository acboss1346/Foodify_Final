import { useEffect, useState } from "react";
import { API } from "../api";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await API.get("/foods"); // fetch menu items
        setItems(res.data);
      } catch (error) {
        console.error("Error loading foods:", error);
        alert("Failed to load menu.");
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  const addToCart = async (foodId) => {
    try {
      await API.post("/cart/add", { foodId, quantity: 1 });
      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return <div style={{ padding: "100px", textAlign: "center" }}>Loading menu...</div>;
  }

  return (
    <div
      style={{
        padding: "100px 20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8FFF1, #F7FFFC)"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          color: "#0d9f6e",
          marginBottom: "30px"
        }}
      >
        Menu
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "22px",
          paddingBottom: "40px"
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "0.3s",
              border: "1px solid #e8f5ef",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
          >
            <h3 style={{ marginBottom: "8px", color: "#0d9f6e" }}>
              {item.name}
            </h3>
            <p style={{ marginBottom: "16px", fontSize: "18px" }}>
              <b>₹{item.price}</b>
            </p>

            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0a8c60")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#10b981")
              }
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
