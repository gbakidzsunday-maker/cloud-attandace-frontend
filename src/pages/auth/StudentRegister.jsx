import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function StudentRegister() {
  const { registerStudent } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await registerStudent(fullName.trim(), email.trim(), password);
      navigate("/sessions");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Registration failed. Please try again.");
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
          <h1 className="font-display text-2xl text-navy">Student Registration</h1>
          <p className="text-sm text-navy-600 mt-1">Create your attendance account</p>
        </div>

        <form onSubmit={handleSubmit} className="panel space-y-4">
          <div>
            <label className="field-label" htmlFor="full-name">Full name</label>
            <input id="full-name" type="text" required className="field-input"
              value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="field-input"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="student@mapoly.edu.ng" />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" required minLength={6} className="field-input"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" required minLength={6} className="field-input"
              value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          {error && <p className="text-sm text-rejected">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-navy-600">
          Already registered?{" "}
          <Link to="/login" className="underline underline-offset-2 hover:text-navy">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
