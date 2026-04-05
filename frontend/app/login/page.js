"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="glass-card">
            <h1 className="auth-title" id="login-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <HiOutlineMail className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <HiOutlineLockClosed className="input-icon" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Link href="/forgot-password" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                id="login-submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <div className="spinner-sm" /> : "Sign In"}
              </motion.button>
            </form>

            <div className="auth-footer">
              Don&apos;t have an account?{" "}
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
