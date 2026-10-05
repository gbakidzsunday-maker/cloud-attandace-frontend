import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { enrolStudent } from "../../api/client.js";

export default function EnrolStudents() {
  const { courseCode } = useParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [enrolled, setEnrolled] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await enrolStudent(courseCode, { student_email: email });
      setEnrolled((list) => [email, ...list]);
      setStatus({ type: "success", message: `Enrolled ${email}.` });
      setEmail("");
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.detail || "Could not enrol this student." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-2xl mb-1">Enrol Students</h2>
      <p className="text-sm text-navy-600 mb-6">Course: {courseCode}</p>

      <form onSubmit={handleSubmit} className="panel space-y-4">
        <div>
          <label className="field-label" htmlFor="student-email">Student email</label>
          <input id="student-email" type="email" required className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@mapoly.edu.ng" />
        </div>
        {status && <p className={`text-sm ${status.type === "success" ? "text-present" : "text-rejected"}`}>{status.message}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Enrolling…" : "Enrol student"}
        </button>
      </form>

      {enrolled.length > 0 && (
        <div className="mt-6">
          <p className="field-label">Enrolled this session</p>
          <ul className="text-sm text-navy-700 space-y-1">
            {enrolled.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
