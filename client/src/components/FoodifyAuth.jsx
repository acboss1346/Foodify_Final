import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { signup, login, getUser } from "../api";

export default function FoodifyAuth({ setUser }) {
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        if (res.data.user) {
          setUser(res.data.user);
          window.location.href = "/home";
        }
      } catch { /* empty */ }
    }
    fetchUser();
  }, [setUser]);

  const handleSignup = async (data) => {
    try {
      setError("");
      const res = await signup(data);
      setUser(res.data.user);
      window.location.href = "/home";
    } catch (err) {
      if (err.response?.status === 409) {
        try {
          const loginRes = await login({ identifier: data.email, password: data.password });
          setUser(loginRes.data.user);
          window.location.href = "/home";
        } catch {
          setError("User exists but login failed.");
        }
      } else {
        setError(err.response?.data?.message || "Signup failed.");
      }
    }
  };

  const handleLogin = async (data) => {
    try {
      setError("");
      const res = await login(data);
      setUser(res.data.user);
      window.location.href = "/home";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <AuthForm onSignup={handleSignup} onLogin={handleLogin} error={error} />
  );
}