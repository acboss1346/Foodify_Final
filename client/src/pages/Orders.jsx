import { useEffect, useState } from "react";
import { API } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { API.get("/orders/user").then((res) => setOrders(res.data)); }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING": return "status-pending";
      case "CONFIRMED": return "status-confirmed";
      case "COMPLETED": return "status-completed";
      default: return "";
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order History</h2>

      {orders.length === 0 && <p className="orders-empty">No orders placed yet.</p>}

      <div className="orders-list">
        {orders.map((o) => (
          <div key={o.id} className="order-card" style={{ borderLeft: o.status === "COMPLETED" ? "4px solid var(--color-success)" : "4px solid var(--color-warning)" }}>
            <div className="order-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
              <div>
                <p className="order-id" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>ID: #{o.id}</p>
                <p className="order-total" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>₹{o.total}</p>
              </div>
              <span className={`order-status ${getStatusClass(o.status)}`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}