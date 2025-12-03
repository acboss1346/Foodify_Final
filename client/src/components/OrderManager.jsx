import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [search, status, page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 5,
        search,
        status,
        sortBy: "createdAt",
        sortOrder: "desc"
      });

      const res = await API.get(`/orders/all?${params.toString()}`);
      setOrders(res.data.data || []);
      setTotalPages(res.data.meta?.totalPages || 1);
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

  return (
    <div>
      <h3 className="orders-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "left" }}>Live Order Queue</h3>


      <div className="order-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search Order ID or Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{ flex: 1 }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-select">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ height: 'auto', padding: '2rem' }}>Loading Orders...</div>
      ) : (
        <>
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


          <div className="pagination-controls" style={{ marginTop: '2rem' }}>
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="page-btn"
            >
              Previous
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}