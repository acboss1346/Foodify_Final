import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { signup, login, getUser } from "../api";

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
  }, [setUser]);

  // ---------------- SIGNUP ----------------
  const handleSignup = async (data) => {
    try {
      setError("");
      const res = await signup(data);
      setUser(res.data.user);

      alert(`Logged in as ${res.data.user.username}`);

      window.location.href = "/home"; // redirect after signup
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

          window.location.href = "/home"; // redirect
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

      window.location.href = "/home"; // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  // ---------------- LOGOUT ----------------
  // eslint-disable-next-line no-unused-vars
  const handleLogout = async () => {
    // This function is not used here but kept for context consistency if the parent component calls it.
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Keeping a clean background, as per your theme
        background: "linear-gradient(135deg, #e5f9f2 0%, #f7fffb 100%)",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          animation: "fadeIn 0.3s ease",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "700",
            color: "#10b981",
          }}
        >
          Foodify
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          Smart Food Ordering & Delivery System
        </p>

        {/* AUTH UI */}
        <AuthForm onSignup={handleSignup} onLogin={handleLogin} error={error} />
      </div>
    </div>
  );
}