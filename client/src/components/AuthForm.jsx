import { useState } from "react";

export default function AuthForm({ onSignup, onLogin, error }) {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const buttonStyle = {
    background: "#e5f9f2",
    color: "#065f46",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "0.2s",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: "#10b981",
    color: "white",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    margin: "8px 0",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  const submitButtonStyle = {
    width: "100%",
    background: "#10b981",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "16px",
    marginTop: "14px",
    cursor: "pointer",
    transition: "0.2s",
  };

  const errorMessageStyle = {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    marginTop: "10px",
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "18px" }}>
        <button
          type="button"
          style={mode === "signup" ? activeButtonStyle : buttonStyle}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
        <button
          type="button"
          style={mode === "login" ? activeButtonStyle : buttonStyle}
          onClick={() => setMode("login")}
        >
          Login
        </button>
      </div>

      {mode === "signup" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignup({ username, email, password, role });
          }}
        >
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {/* NEW ROLE SELECT */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p style={errorMessageStyle}>{error}</p>}

          <button
            type="submit"
            style={submitButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Create Account
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin({ identifier, password });
          }}
        >
          <input
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {error && <p style={errorMessageStyle}>{error}</p>}

          <button
            type="submit"
            style={submitButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Login
          </button>
        </form>
      )}
    </>
  );
}