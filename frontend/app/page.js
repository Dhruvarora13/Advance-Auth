"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from "react-icons/hi";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const features = [
  {
    icon: <HiOutlineShieldCheck size={24} />,
    title: "JWT Authentication",
    description: "Secure token-based authentication with HTTP-only cookies for maximum protection against XSS attacks.",
  },
  {
    icon: <HiOutlineMail size={24} />,
    title: "Email Verification",
    description: "6-digit OTP verification via email ensures only real users access your application.",
  },
  {
    icon: <HiOutlineLockClosed size={24} />,
    title: "Password Recovery",
    description: "Secure password reset flow with time-limited tokens sent directly to user emails.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="pulse-dot"></span>
          Production Ready Authentication
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Secure Auth for{" "}
          <span className="gradient-text">Modern Apps</span>
        </motion.h1>

        <motion.p className="hero-description" variants={itemVariants}>
          Enterprise-grade authentication system with email verification,
          password recovery, and protected routes — built with Node.js, MongoDB
          & Next.js.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <Link href="/signup" className="btn btn-primary" id="hero-get-started">
            Get Started Free
            <HiOutlineArrowRight size={18} />
          </Link>
          <Link href="/login" className="btn btn-outline" id="hero-sign-in">
            Sign In
          </Link>
        </motion.div>

        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="hero-stat">
            <div className="stat-number">7+</div>
            <div className="stat-label">API Endpoints</div>
          </div>
          <div className="hero-stat">
            <div className="stat-number">JWT</div>
            <div className="stat-label">Token Based</div>
          </div>
          <div className="hero-stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Secure</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Built for Security
        </motion.h2>
        <motion.p className="section-subtitle" variants={itemVariants}>
          Every feature designed to keep your users and data safe
        </motion.p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card feature-card"
              variants={itemVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 AuthShield. Built with ❤️ by Dhruv Arora</p>
        <div className="footer-links">
          <a href="https://github.com/Dhruvarora13" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#">Documentation</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}
