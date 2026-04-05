"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success("Account created! Check your email for verification code.");
      router.push("/verify-email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
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
            <h1 className="auth-title" id="signup-title">Create Account</h1>
            <p className="auth-subtitle">Start your secure journey today</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSignup}>
              <div className="input-group">
                <HiOutlineUser className="input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <HiOutlineMail className="input-icon" />
                <input
                  id="signup-email"
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
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {password && <PasswordStrengthMeter password={password} />}

              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                id="signup-submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <div className="spinner-sm" /> : "Create Account"}
              </motion.button>
            </form>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link href="/login">Sign in</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
