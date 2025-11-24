import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ user, children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth transition before deciding access
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ecfdf5, #ffffff)",
          fontSize: "30px",
          fontWeight: "700",
          color: "#10b981",
          animation: "fadeIn 0.4s ease",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return children;
}