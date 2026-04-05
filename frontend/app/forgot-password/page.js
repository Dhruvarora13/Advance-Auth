"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMail, HiOutlineArrowLeft } from "react-icons/hi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
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
            <h1 className="auth-title" id="forgot-title">
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </h1>
            <p className="auth-subtitle">
              {isSubmitted
                ? "We've sent a password reset link to your email"
                : "Enter your email to receive a reset link"}
            </p>

            {error && <div className="auth-error">{error}</div>}

            {isSubmitted ? (
              <div className="auth-success">
                ✅ If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <HiOutlineMail className="input-icon" />
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-full"
                  id="forgot-submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? <div className="spinner-sm" /> : "Send Reset Link"}
                </motion.button>
              </form>
            )}

            <div className="auth-footer">
              <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <HiOutlineArrowLeft size={16} />
                Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
