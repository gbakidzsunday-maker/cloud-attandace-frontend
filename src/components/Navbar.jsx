import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
    isActive ? "bg-navy text-white" : "text-navy hover:bg-navy-50"
  }`;

const NAV_LINKS = {
  STUDENT: [
    { to: "/sessions", label: "Sessions" },
    { to: "/history", label: "History" },
  ],
  LECTURER: [
    { to: "/lecturer/courses", label: "Courses" },
    { to: "/lecturer/reports", label: "Reports" },
  ],
  ADMIN: [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/lecturers", label: "Lecturers" },
  ],
};

const TITLE = {
  STUDENT: "Attendance",
  LECTURER: "Attendance — Lecturer Console",
  ADMIN: "Attendance — Admin Console",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = () => {
    const loginPath = logout();
    navigate(loginPath);
  };

  return (
    <header className="bg-white border-b border-navy-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-wide text-navy-600 font-medium">
            Moshood Abiola Polytechnic · Department of Computer Science
          </p>
          <h1 className="font-display text-xl text-navy leading-tight">
            {TITLE[user.role]}
          </h1>
        </div>
        <nav className="flex items-center gap-2">
          {NAV_LINKS[user.role].map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleSignOut}
            className="ml-2 px-3 py-2 text-sm font-medium text-rejected hover:bg-red-50 rounded-sm"
          >
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
