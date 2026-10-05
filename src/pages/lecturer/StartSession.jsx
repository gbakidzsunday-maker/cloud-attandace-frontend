import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SessionForm from "../../components/SessionForm.jsx";
import { startSession } from "../../api/client.js";

export default function StartSession() {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      const session = await startSession({ ...payload, course_code: courseCode });
      navigate(`/lecturer/sessions/${session.session_id}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Could not start the session.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h2 className="text-2xl mb-1">Start Session</h2>
      <p className="text-sm text-navy-600 mb-6">
        Course: {courseCode} — students within the radius you set will be auto check-in eligible.
      </p>
      {error && <p className="text-sm text-rejected mb-3">{error}</p>}
      <SessionForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
