import { useState } from "react";

export default function AuthForm({ onSignup, onLogin, error }) {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  return (
    <div className="auth-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'radial-gradient(circle at center, rgba(30, 30, 35, 0.8), var(--color-bg-body))',
    }}>
      <div className="auth-card animate-scale-in" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '3rem',
        background: 'rgba(24, 24, 27, 0.6)',
        backdropFilter: 'blur(20px)',
        border: 'var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div className="auth-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 className="auth-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {mode === "signup" ? "Join Foodify" : "Welcome Back"}
          </h1>
          <p className="auth-subtitle" style={{ color: 'var(--color-text-muted)' }}>
            {mode === "signup"
              ? "Start your culinary journey today."
              : "Sign in to continue ordering."}
          </p>
        </div>

        <div className="auth-toggle" style={{
          background: 'var(--color-bg-input)',
          padding: '0.375rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
        }}>
          <button
            type="button"
            className="auth-toggle-btn"
            style={{
              flex: 1,
              padding: '0.625rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: mode === "login" ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              background: mode === "login" ? 'var(--color-bg-card)' : 'transparent',
              boxShadow: mode === "login" ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
            onClick={() => setMode("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className="auth-toggle-btn"
            style={{
              flex: 1,
              padding: '0.625rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: mode === "signup" ? 'var(--color-text-main)' : 'var(--color-text-muted)',
              background: mode === "signup" ? 'var(--color-bg-card)' : 'transparent',
              boxShadow: mode === "signup" ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
            onClick={() => setMode("signup")}
          >
            Create Account
          </button>
        </div>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            mode === "signup" ? onSignup({ username, email, password, role }) : onLogin({ identifier, password });
          }}
        >
          {mode === "signup" && (
            <>
              <div className="input-group mb-4" style={{ marginBottom: '1rem' }}>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
              <div className="input-group mb-4" style={{ marginBottom: '1rem' }}>
                <input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
            </>
          )}

          {mode === "login" && (
            <div className="input-group mb-4" style={{ marginBottom: '1rem' }}>
              <input
                placeholder="Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          )}

          <div className="input-group mb-4" style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          {mode === "signup" && (
            <div className="input-group mb-4" style={{ marginBottom: '1rem' }}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="auth-input"
                style={{ cursor: "pointer" }}
              >
                <option value="user">User Account</option>
                <option value="admin">Admin Account</option>
              </select>
            </div>
          )}

          {error && (
            <div className="auth-error" style={{
              color: 'var(--color-error)',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {mode === "signup" ? "Create Account" : "Access Account"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}