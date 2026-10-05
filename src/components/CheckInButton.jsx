import React from "react";

export default function CheckInButton({ onPress, loading, disabled }) {
  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      className="w-40 h-40 rounded-full bg-navy text-white font-display text-lg
                 flex items-center justify-center mx-auto
                 hover:bg-navy-700 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Checking…" : "Mark Attendance"}
    </button>
  );
}
