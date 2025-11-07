// src/components/Logo.jsx
import React from "react";

export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Hospital logo"
    >
      <title>Hospital Shield Logo</title>
      <defs>
        <linearGradient id="logoGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1976d2" />
          <stop offset="1" stopColor="#43a047" />
        </linearGradient>
      </defs>

      <path
        fill="url(#logoGradient)"
        d="M32 2 L8 10 v14c0 16 12 28 24 36 12-8 24-20 24-36V10L32 2z"
      />
      <rect x="26" y="20" width="12" height="24" rx="1.5" ry="1.5" fill="#fff" />
      <rect x="20" y="26" width="24" height="12" rx="1.5" ry="1.5" fill="#fff" />
    </svg>
  );
}
