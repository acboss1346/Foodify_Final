import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
      backgroundColor: scrolled ? 'rgba(10, 10, 12, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? 'var(--border-subtle)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" className="nav-logo" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.75rem',
        fontWeight: 800,
        color: 'var(--color-text-main)',
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        Foodify<span style={{ color: 'var(--color-primary)', fontSize: '2rem', lineHeight: 0 }}>.</span>
      </Link>

      <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {["Home", "Menu", "Cart", "Orders"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className={`nav-link ${location.pathname === `/${item.toLowerCase()}` ? 'active' : ''}`}
            style={{
              color: location.pathname === `/${item.toLowerCase()}` ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              fontWeight: 500,
              fontSize: '0.95rem',
              position: 'relative',
              paddingBottom: '4px',
              transition: 'color 0.2s'
            }}
          >
            {item}
            {location.pathname === `/${item.toLowerCase()}` && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'var(--color-primary)',
                borderRadius: '99px',
                boxShadow: '0 0 8px var(--color-primary)'
              }} />
            )}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        {!user ? (
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="user-menu" ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              className="user-trigger"
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.375rem 0.5rem 0.375rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                border: 'var(--border-subtle)',
                borderRadius: '9999px',
                color: 'var(--color-text-main)',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem'
              }}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span>{user.username}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {open && (
              <div className="dropdown-menu animate-scale-in" style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: '200px',
                background: 'var(--color-bg-card)',
                border: 'var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.5rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  className="dropdown-item"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-error)',
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}