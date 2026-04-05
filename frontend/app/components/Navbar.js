"use client";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        <div className="logo-icon">🛡️</div>
        <span>AuthShield</span>
      </Link>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="btn btn-outline">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-primary">
              <HiOutlineLogout size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline">
              Sign In
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
