"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineLockClosed } from "react-icons/hi";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/authStore";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, error, message } = useAuthStore();
  const { token } = useParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
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
            <h1 className="auth-title" id="reset-title">Reset Password</h1>
            <p className="auth-subtitle">Enter your new password below</p>

            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <HiOutlineLockClosed className="input-icon" />
                <input
                  id="reset-password"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <HiOutlineLockClosed className="input-icon" />
                <input
                  id="reset-confirm-password"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                id="reset-submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <div className="spinner-sm" /> : "Set New Password"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
