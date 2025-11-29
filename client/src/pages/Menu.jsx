import { useEffect, useState } from "react";
import { API } from "../api";

// --- COLOR ARRAY for the Multi-Colored Text Effect ---
const RAINBOW_COLORS = [
    "#FF5733", "#FFBD33", "#75FF33", "#33FF57", 
    "#33FFBD", "#3375FF", "#5733FF", "#BD33FF"
];

// Function to split text and color each character
const getRainbowText = (text, customFont) => {
    return text.split('').map((char, index) => (
        <span
            key={index}
            style={{
                color: RAINBOW_COLORS[index % RAINBOW_COLORS.length],
                fontFamily: customFont,
                fontWeight: '800' // Ensure the text is bold and stands out
            }}
        >
            {char}
        </span>
    ));
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Custom font for food names (using a fun, bold option)
  const foodNameFont = "Sigmar One, cursive"; 

  const loadMenu = async () => {
    try {
      const res = await API.get("/foods"); 
      setItems(res.data);
    } catch (error) {
      console.error("Error loading foods:", error);
      alert("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        background: "linear-gradient(135deg, #E8FFF1, #F7FFFC)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          color: "#0d9f6e",
          marginBottom: "60px", 
          paddingTop: "20px", 
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
        }}
      >
        Grab a Quick Snack 🍟🥤
      </h2>
      
      {items.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#6b7280' }}>
              No items currently available.
          </p>
      )}

      {/* PRODUCT GRID with Multi-Colored Text Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "30px", 
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "40px"
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "14px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "0.3s",
              border: "1px solid #e8f5ef",
              cursor: "pointer",
              padding: '25px', // Increased overall padding
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"; 
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
          >
            {/* ITEM NAME (Colorful Text) */}
            <div style={{ padding: '0 0 10px 0' }}>
              <h3 style={{ marginBottom: "10px", fontSize: "30px" }}> {/* Increased font size slightly */}
                {getRainbowText(item.name.toUpperCase(), foodNameFont)} 
              </h3>
              
              {/* Category Display (Refined style) */}
              {item.category && (
                 <p style={{ marginBottom: "15px", fontSize: "16px", color: '#374151', fontWeight: 600, letterSpacing: '0.5px' }}>
                    <span style={{ color: '#0d9f6e' }}>[</span> {item.category} <span style={{ color: '#0d9f6e' }}>]</span>
                </p>
              )}

              {/* Price Display (Increased Emphasis) */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: "36px", fontWeight: '900', color: '#1f2937' }}> {/* Increased size and weight */}
                  <span style={{ color: '#dc2626', fontSize: "28px", verticalAlign: 'top', marginRight: '5px' }}>₹</span>{item.price}
                </p>
              </div>

              <button
                onClick={() => addToCart(item.id)}
                style={{
                  width: "100%",
                  padding: "12px", // Increased padding
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.2s",
                  fontWeight: "700", // Bolder button text
                  fontSize: '16px',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0a8c60")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#10b981")
                }
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