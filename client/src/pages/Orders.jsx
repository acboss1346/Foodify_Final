import { useEffect, useState } from "react";
import { API } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/user").then((res) => setOrders(res.data));
  }, []);

  return (
    <div
      style={{
        paddingTop: "120px",
        minHeight: "100vh",
        padding: "120px 20px",
        background: "linear-gradient(180deg, #ecfdf5 0%, #ffffff 100%)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#10b981",
          fontSize: "34px",
          fontWeight: "800",
          marginBottom: "32px",
        }}
      >
        Your Orders
      </h2>

      {orders.length === 0 && (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          No orders yet.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 12px 26px rgba(16,185,129,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.08)";
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "8px" }}>
              <b>Order ID:</b> {o.id}
            </p>

            <p
              style={{
                fontSize: "16px",
                color: "#064e3b",
                marginBottom: "8px",
              }}
            >
              <b>Status:</b> {o.status}
            </p>

            <p
              style={{
                fontSize: "18px",
                color: "#10b981",
                fontWeight: "600",
              }}
            >
              <b>Total:</b> ₹{o.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
