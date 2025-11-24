import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { signup, login, getUser, logout } from "../api";

export default function FoodifyAuth({ setUser }) {
  const [error, setError] = useState("");

  // Check logged-in user on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        if (res.data.user) {
          setUser(res.data.user);
          window.location.href = "/home"; // redirect if already logged in
        }
      } catch {
        /* not logged in */
      }
    }
    fetchUser();
  }, []);

  // ---------------- SIGNUP ----------------
  const handleSignup = async (data) => {
    try {
      setError("");
      const res = await signup(data);
      setUser(res.data.user);

      alert(`Logged in as ${res.data.user.username}`);

      window.location.href = "/home";   // redirect after signup
    } catch (err) {
      if (err.response?.status === 409) {
        // auto-login if user exists
        try {
          const loginRes = await login({
            identifier: data.email,
            password: data.password,
          });

          setUser(loginRes.data.user);
          alert(`Logged in as ${loginRes.data.user.username}`);

          window.location.href = "/home";   // redirect
        } catch {
          setError("User already exists but login failed.");
        }
      } else {
        setError(err.response?.data?.message || "Signup failed. Try again.");
      }
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (data) => {
    try {
      setError("");
      const res = await login(data);

      setUser(res.data.user);
      alert(`Logged in as ${res.data.user.username}`);

      window.location.href = "/home";   // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  // ---------------- LOGOUT ----------------
  // eslint-disable-next-line no-unused-vars
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      alert("Logged out");

      window.location.href = "/";
    } catch {
      setError("Logout failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Foodify</h1>
        <p className="subtitle">Smart Food Ordering & Delivery System</p>

        {/* AUTH UI */}
        <AuthForm
          onSignup={handleSignup}
          onLogin={handleLogin}
          error={error}
        />
      </div>
    </div>
  );
}