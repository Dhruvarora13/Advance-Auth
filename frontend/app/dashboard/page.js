"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineMail, HiOutlineCalendar, HiOutlineUser, HiOutlineBadgeCheck } from "react-icons/hi";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../store/authStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const { user, isAuthenticated, isCheckingAuth, checkAuth, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isCheckingAuth, isAuthenticated, router]);

  if (isCheckingAuth) return <LoadingSpinner />;
  if (!user) return <LoadingSpinner />;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <motion.div
          className="dashboard-container"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="dashboard-header" variants={itemVariants}>
            <div className="dashboard-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h1 className="dashboard-name">{user.name}</h1>
            <p className="dashboard-email">{user.email}</p>
            <div style={{ marginTop: "12px" }}>
              {user.isVerified ? (
                <span className="badge badge-verified">
                  <HiOutlineBadgeCheck size={14} />
                  Verified
                </span>
              ) : (
                <span className="badge badge-unverified">
                  ⚠ Not Verified
                </span>
              )}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="dashboard-grid" variants={itemVariants}>
            <div className="glass-card dashboard-stat">
              <div className="stat-icon green">
                <HiOutlineShieldCheck size={22} />
              </div>
              <div className="stat-label">Account Status</div>
              <div className="stat-value">{user.isVerified ? "Verified" : "Pending"}</div>
            </div>
            <div className="glass-card dashboard-stat">
              <div className="stat-icon purple">
                <HiOutlineClock size={22} />
              </div>
              <div className="stat-label">Last Login</div>
              <div className="stat-value">{formatDate(user.lastLogin)}</div>
            </div>
            <div className="glass-card dashboard-stat">
              <div className="stat-icon amber">
                <HiOutlineCalendar size={22} />
              </div>
              <div className="stat-label">Member Since</div>
              <div className="stat-value">{formatDate(user.createdAt)}</div>
            </div>
            <div className="glass-card dashboard-stat">
              <div className="stat-icon rose">
                <HiOutlineMail size={22} />
              </div>
              <div className="stat-label">Email</div>
              <div className="stat-value" style={{ fontSize: "13px" }}>{user.email}</div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div className="glass-card profile-section" variants={itemVariants}>
            <h3>
              <HiOutlineUser size={20} />
              Profile Information
            </h3>
            <div className="profile-row">
              <span className="label">Full Name</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="profile-row">
              <span className="label">Email Address</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="profile-row">
              <span className="label">Verification</span>
              <span className="value">
                {user.isVerified ? (
                  <span className="badge badge-verified">
                    <HiOutlineBadgeCheck size={14} />
                    Verified
                  </span>
                ) : (
                  <span className="badge badge-unverified">⚠ Pending</span>
                )}
              </span>
            </div>
            <div className="profile-row">
              <span className="label">Last Login</span>
              <span className="value">{formatDate(user.lastLogin)}</span>
            </div>
            <div className="profile-row">
              <span className="label">Account Created</span>
              <span className="value">{formatDate(user.createdAt)}</span>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div className="glass-card profile-section" variants={itemVariants} style={{ borderColor: "rgba(244, 63, 94, 0.2)" }}>
            <h3 style={{ color: "var(--accent-rose)" }}>
              ⚠ Danger Zone
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontWeight: 500, marginBottom: "4px" }}>Sign Out</p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>End your current session</p>
              </div>
              <motion.button
                className="btn btn-outline"
                id="dashboard-logout"
                style={{ borderColor: "rgba(244, 63, 94, 0.3)", color: "var(--accent-rose)" }}
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
