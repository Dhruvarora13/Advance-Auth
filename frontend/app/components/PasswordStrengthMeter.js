"use client";
import { HiCheck, HiX } from "react-icons/hi";

const criteria = [
  { label: "6+ characters", test: (p) => p.length >= 6 },
  { label: "Uppercase", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase", test: (p) => /[a-z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
];

export default function PasswordStrengthMeter({ password }) {
  const passed = criteria.filter((c) => c.test(password)).length;

  const getStrengthLabel = () => {
    if (passed === 0) return "";
    if (passed <= 1) return "Weak";
    if (passed <= 2) return "Fair";
    if (passed <= 3) return "Good";
    return "Strong";
  };

  const getBarClass = (index) => {
    if (index >= passed) return "strength-bar";
    if (passed <= 1) return "strength-bar active";
    if (passed <= 2) return "strength-bar active medium";
    return "strength-bar active strong";
  };

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={getBarClass(i)} />
        ))}
      </div>
      <div className="strength-text">{getStrengthLabel()}</div>
      <div className="strength-criteria">
        {criteria.map((c, i) => (
          <div key={i} className={`criteria-item ${c.test(password) ? "met" : ""}`}>
            {c.test(password) ? <HiCheck size={14} /> : <HiX size={14} />}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
