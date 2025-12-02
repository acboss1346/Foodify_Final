import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) { console.error("Error fetching orders"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/orders/status/${id}`, { status });
    fetchOrders();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING": return "status-pending";
      case "CONFIRMED": return "status-confirmed";
      case "COMPLETED": return "status-completed";
      default: return "";
    }
  };

  if (loading) return <div className="loading-screen" style={{ height: 'auto', padding: '2rem' }}>Loading Orders...</div>;

  return (
    <div>
      <h3 className="orders-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "left" }}>Live Order Queue</h3>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">#{order.id} <span className="order-user">by {order.user.username}</span></span>
              <span className={`order-status ${getStatusClass(order.status)}`}>{order.status}</span>
            </div>

            <div className="order-items">
              {order.orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.quantity}x {item.food.name}</span>
                  <span>₹{(item.food.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-total">Total: ₹{parseFloat(order.total).toFixed(2)}</span>
              <div className="order-actions">
                <button
                  disabled={order.status === "COMPLETED"}
                  onClick={() => updateStatus(order.id, "CONFIRMED")}
                  className="action-btn btn-confirm"
                >
                  Confirm
                </button>
                <button
                  disabled={order.status === "COMPLETED"}
                  onClick={() => updateStatus(order.id, "COMPLETED")}
                  className="action-btn btn-complete"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}