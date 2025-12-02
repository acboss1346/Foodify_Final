import { useState } from "react";

export default function AuthForm({ onSignup, onLogin, error }) {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  return (
    <>
      <div className="auth-toggle">
        <button
          type="button"
          className={`auth-toggle-btn ${mode === "signup" ? "active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
        <button
          type="button"
          className={`auth-toggle-btn ${mode === "login" ? "active" : ""}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mode === "signup" ? onSignup({ username, email, password, role }) : onLogin({ identifier, password });
        }}
      >
        {mode === "signup" && (
          <>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </>
        )}

        {mode === "login" && (
          <input
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="auth-input"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />

        {mode === "signup" && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-input"
            style={{ cursor: "pointer" }}
          >
            <option value="user">User Account</option>
            <option value="admin">Admin Account</option>
          </select>
        )}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="auth-submit-btn"
        >
          {mode === "signup" ? "Create Account" : "Access Account"}
        </button>
      </form>
    </>
  );
}