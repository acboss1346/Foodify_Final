import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        padding: "14px 28px",
        background: "linear-gradient(90deg, #ffffff 0%, #e8fff5 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#10b981",
          textDecoration: "none",
          transition: "0.2s",
        }}
      >
        Foodify
      </Link>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "22px",
        }}
      >
        {["Home", "Menu", "Cart"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "#1f2937",
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: "6px",
              transition: "0.25s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.color = "#10b981")
            }
            onMouseLeave={(e) =>
              (e.target.style.color = "#1f2937")
            }
          >
            {item}
          </Link>
        ))}
      </div>

      {/* LOGIN BUTTON (when not logged in) */}
      {!user && (
        <Link
          to="/"
          style={{
            padding: "8px 18px",
            background: "#10b981",
            color: "white",
            borderRadius: "20px",
            fontWeight: 500,
            textDecoration: "none",
            transition: "0.25s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "#0c9467")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "#10b981")
          }
        >
          Login
        </Link>
      )}

      {/* PROFILE DROPDOWN */}
      {user && (
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            padding: "8px 20px",
            background: "#10b981",
            borderRadius: "20px",
            color: "white",
            fontWeight: 600,
            transition: "0.25s",
          }}
          onClick={() => setOpen((prev) => !prev)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#0c9467")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#10b981")
          }
        >
          {user.username}

          {/* DROPDOWN PANEL */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              right: 0,
              display: open ? "block" : "none",
              background: "white",
              width: "170px",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              padding: "10px 0",
              transition: "0.25s",
            }}
          >
            {/* LOGOUT */}
            <div
              onClick={onLogout}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                color: "#1f2937",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e9fff3";
                e.target.style.color = "#10b981";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#1f2937";
              }}
            >
              Logout
            </div>

            {/* ORDERS */}
            <Link
              to="/orders"
              style={{
                display: "block",
                padding: "10px 14px",
                textDecoration: "none",
                color: "#1f2937",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e9fff3";
                e.target.style.color = "#10b981";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#1f2937";
              }}
            >
              My Orders
            </Link>

            {/* ADMIN PANEL */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                style={{
                  display: "block",
                  padding: "10px 14px",
                  textDecoration: "none",
                  color: "#1f2937",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e9fff3";
                  e.target.style.color = "#10b981";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#1f2937";
                }}
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
