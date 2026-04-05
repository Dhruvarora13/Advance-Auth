"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { verifyEmail, error, isLoading } = useAuthStore();
  const router = useRouter();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const focusIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  // Auto-submit when all digits filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

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
            <h1 className="auth-title" id="verify-title">Verify Email</h1>
            <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="verify-code-inputs">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`verify-input-${index}`}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                id="verify-submit"
                disabled={isLoading || code.some((d) => !d)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <div className="spinner-sm" /> : "Verify Email"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
