import { useState } from "react";

export default function AuthForm({ onSignup, onLogin, error }) {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // NEW

  return (
    <>
      <div className="auth-tabs">
        <button
          type="button"
          className={mode === "signup" ? "active" : ""}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
        <button
          type="button"
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Login
        </button>
      </div>

      {mode === "signup" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignup({ username, email, password, role }); // UPDATED
          }}
        >
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      )}
    </>
  );
}