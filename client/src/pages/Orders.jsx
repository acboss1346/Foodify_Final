import { useEffect, useState } from "react";
import { API } from "../api";
import { useToast } from "../context/ToastContext";
import Skeleton from "../components/Skeleton";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    API.get("/orders/user")
      .then((res) => setOrders(res.data))
      .catch(() => addToast("Failed to fetch orders", "error"))
      .finally(() => setLoading(false));
  }, [addToast]);

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
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        Order History <span style={{ color: "var(--color-primary)" }}>📜</span>
      </h2>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="100%" height="80px" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>No orders placed yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((o) => (
            <div key={o.id} className="glass-card" style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: `4px solid ${getStatusColor(o.status)}`
            }}>
              <div>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.25rem'
                }}>
                  Order #{o.id}
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{o.total}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: `${getStatusColor(o.status)}20`,
                  color: getStatusColor(o.status),
                  border: `1px solid ${getStatusColor(o.status)}40`
                }}>
                  {o.status}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  {new Date(o.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}