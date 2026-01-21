import React, { useState, useEffect } from "react";
import { API } from "../api";
import { useToast } from "../context/ToastContext";
import Skeleton from "./Skeleton";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (err) {
      // minimal error handling for admin dashboard to prevent spam
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/status/${id}`, { status: newStatus });
      addToast(`Order #${id} marked as ${newStatus}`, "success");
      fetchOrders();
    } catch {
      addToast("Failed to update status", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "var(--color-warning)";
      case "CONFIRMED": return "var(--color-info)";
      case "COMPLETED": return "var(--color-success)";
      case "CANCELLED": return "var(--color-error)";
      default: return "var(--color-text-muted)";
    }
  };

  return (
    <div>
      <h3 style={{ fontSize: "1.5rem", marginBottom: '1.5rem' }}>Live Order Queue ⚡</h3>

      <div className="glass-card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search Order ID or Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', background: 'var(--color-bg-input)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-text-main)' }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-input)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-text-main)' }}
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[...Array(5)].map((_, i) => <Skeleton key={i} width="100%" height="180px" />)}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order.id} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: 'var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>#{order.id}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>by {order.user.username}</span>
                  </div>
                  <span style={{
                    color: getStatusColor(order.status),
                    background: `${getStatusColor(order.status)}15`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: `1px solid ${getStatusColor(order.status)}30`
                  }}>
                    {order.status}
                  </span>
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem' }}>
                  {order.orderItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>{item.quantity}x</span> {item.food.name}
                      </span>
                      <span>₹{(item.food.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    Total: <span style={{ color: 'var(--color-primary)' }}>₹{parseFloat(order.total).toFixed(2)}</span>
                  </span>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                      <>
                        {order.status === "PENDING" && (
                          <button
                            onClick={() => updateStatus(order.id, "CONFIRMED")}
                            className="btn"
                            style={{
                              background: 'var(--color-info)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              fontSize: '0.9rem'
                            }}
                          >
                            Accept Order
                          </button>
                        )}
                        <button
                          onClick={() => updateStatus(order.id, "COMPLETED")}
                          className="btn"
                          style={{
                            background: 'var(--color-success)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '3rem',
            borderTop: 'var(--border-subtle)',
            paddingTop: '2rem'
          }}>
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="btn btn-secondary"
              style={{ opacity: page <= 1 ? 0.5 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ color: 'var(--color-text-muted)' }}>Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="btn btn-secondary"
              style={{ opacity: page >= totalPages ? 0.5 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}