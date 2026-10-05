import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/client.js";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ course_code: "", title: "", unit: 2 });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createCourse({ ...form, unit: Number(form.unit) });
      navigate("/lecturer/courses");
    } catch (err) {
      setError(err.response?.data?.detail || "Could not create course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-2xl mb-6">Create Course</h2>
      <form onSubmit={handleSubmit} className="panel space-y-4">
        <div>
          <label className="field-label" htmlFor="course_code">Course code</label>
          <input id="course_code" name="course_code" required placeholder="CSC 301" className="field-input" value={form.course_code} onChange={handleChange} />
        </div>
        <div>
          <label className="field-label" htmlFor="title">Course title</label>
          <input id="title" name="title" required placeholder="Computer Networks" className="field-input" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label className="field-label" htmlFor="unit">Units</label>
          <input id="unit" name="unit" type="number" min="1" max="6" className="field-input" value={form.unit} onChange={handleChange} />
        </div>
        {error && <p className="text-sm text-rejected">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Creating…" : "Create course"}
        </button>
      </form>
    </div>
  );
}
