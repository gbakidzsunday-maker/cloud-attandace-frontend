import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLecturer } from "../../api/client.js";

export default function CreateLecturer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // role is fixed to LECTURER by the admin-only endpoint on the backend.
      await createLecturer(form);
      navigate("/admin/lecturers");
    } catch (err) {
      setError(err.response?.data?.detail || "Could not create the lecturer account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-2xl mb-6">Create Lecturer Account</h2>
      <form onSubmit={handleSubmit} className="panel-admin space-y-4">
        <div>
          <label className="field-label" htmlFor="full_name">Full name</label>
          <input id="full_name" name="full_name" required placeholder="Dr. A. B. Yusuf" className="field-input" value={form.full_name} onChange={handleChange} />
        </div>
        <div>
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="ab.yusuf@mapoly.edu.ng" className="field-input" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="field-label" htmlFor="password">Temporary password</label>
          <input id="password" name="password" type="password" required minLength={8} className="field-input" value={form.password} onChange={handleChange} />
          <p className="text-xs text-navy-600 mt-1">
            Share this with the lecturer securely — they should change it after first sign-in.
          </p>
        </div>
        {error && <p className="text-sm text-rejected">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full bg-plum hover:bg-plum-600">
          {submitting ? "Creating…" : "Create lecturer account"}
        </button>
      </form>
    </div>
  );
}
