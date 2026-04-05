"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AuthShield — Advanced Authentication</title>
        <meta name="description" content="Enterprise-grade authentication system with email verification, password recovery, and secure session management." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Floating background orbs */}
        <div className="floating-bg">
          <div className="orb"></div>
          <div className="orb"></div>
          <div className="orb"></div>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(30, 30, 60, 0.95)",
              color: "#f0f0f5",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
