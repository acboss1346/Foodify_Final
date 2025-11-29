import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      // Calls the new GET /api/orders/all endpoint
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching all orders:", err);
      alert("Failed to load orders. Admin access required.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Calls the new PUT /api/orders/status/:id endpoint
      await API.put(`/orders/status/${orderId}`, { status: newStatus });
      alert(`Order #${orderId} status updated to ${newStatus}!`);
      fetchAllOrders(); // Refresh the list
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update status. Check backend console.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading Orders...
      </div>
    );
  }

  // Custom style helper for status pills
  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return {
          backgroundColor: "#fffbe6",
          color: "#d97706",
          fontWeight: 600,
          padding: "4px 8px",
          borderRadius: "4px",
        };
      case "CONFIRMED":
        return {
          backgroundColor: "#eff6ff",
          color: "#2563eb",
          fontWeight: 600,
          padding: "4px 8px",
          borderRadius: "4px",
        };
      case "COMPLETED":
        return {
          backgroundColor: "#ecfdf5",
          color: "#059669",
          fontWeight: 600,
          padding: "4px 8px",
          borderRadius: "4px",
        };
      default:
        return {};
    }
  };

  const buttonBaseStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s",
  };

  return (
    <div>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#0f5132",
          marginBottom: "20px",
          borderBottom: "2px solid #a7f3d0",
          paddingBottom: "10px",
        }}
      >
        Manage Customer Orders ({orders.length})
      </h3>

      {orders.length === 0 && <p>No orders currently placed.</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              borderLeft: "4px solid #10b981",
            }}
          >
            {/* Header: ID, Date, Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "18px" }}>
                Order #{order.id}
              </span>
              <span style={getStatusStyle(order.status)}>{order.status}</span>
            </div>

            {/* Body: User and Total */}
            <p style={{ margin: "5px 0" }}>
              Customer: **{order.user.username}** ({order.user.email})
            </p>
            <p
              style={{
                margin: "5px 0",
                fontSize: "16px",
                fontWeight: 600,
                color: "#047857",
              }}
            >
              Total: ₹{parseFloat(order.total).toFixed(2)}
            </p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#6b7280" }}>
              Placed: {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* Items List */}
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                background: "#f9fafb",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>
                Order Details:
              </h4>
              {order.orderItems.map((item) => (
                <p
                  key={item.id}
                  style={{ fontSize: "13px", margin: "3px 0", color: "#4b5563" }}
                >
                  {item.food.name} x **{item.quantity}** (₹
                  {(item.food.price * item.quantity).toFixed(2)})
                </p>
              ))}
            </div>

            {/* Status Update Controls */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}
                disabled={order.status === "COMPLETED"}
                style={{
                  ...buttonBaseStyle,
                  background:
                    order.status === "CONFIRMED" ? "#93c5fd" : "#3b82f6",
                  color: "white",
                }}
              >
                Confirm Order
              </button>
              <button
                onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                disabled={order.status === "COMPLETED"}
                style={{
                  ...buttonBaseStyle,
                  background: "#10b981",
                  color: "white",
                }}
              >
                Mark Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}