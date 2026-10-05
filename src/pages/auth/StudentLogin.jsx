import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function StudentLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password, "STUDENT");
      navigate("/sessions");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-wide text-navy-600 font-medium uppercase">
            Moshood Abiola Polytechnic
          </p>
          <p className="text-xs text-navy-600 mb-3">Department of Computer Science</p>
          <h1 className="font-display text-2xl text-navy">Student Sign In</h1>
          <p className="text-sm text-navy-600 mt-1">Cloud Attendance Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="panel space-y-4">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@mapoly.edu.ng"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-rejected">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-4 text-xs text-navy-600">
          <Link to="/lecturer/login" className="underline underline-offset-2 hover:text-navy">
            Lecturer sign in
          </Link>
          <Link to="/admin/login" className="underline underline-offset-2 hover:text-navy">
            Admin sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
