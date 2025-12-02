import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Foodify</Link>
      <div className="nav-links">
        {["Home", "Menu", "Cart"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className={`nav-link ${location.pathname === `/${item.toLowerCase()}` ? 'active' : ''}`}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        {!user ? (
          <Link to="/" className="nav-btn nav-btn-primary">
            Login
          </Link>
        ) : (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-trigger"
              onClick={() => setOpen(!open)}
            >
              <span>{user.username}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div className={`dropdown-menu ${open ? 'show' : ''}`}>
              <Link
                to="/orders"
                className="dropdown-item"
                onClick={() => setOpen(false)}
              >
                My Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              <div className="dropdown-divider"></div>

              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="dropdown-item text-danger"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}