import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLecturers } from "../../api/client.js";

export default function LecturerList() {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLecturers()
      .then(setLecturers)
      .catch(() => setError("Could not load lecturer accounts."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Lecturers</h2>
        <Link to="/admin/lecturers/new" className="btn-primary bg-plum hover:bg-plum-600">
          + New lecturer
        </Link>
      </div>

      {loading && <p className="text-navy-600 text-sm">Loading…</p>}
      {error && <p className="text-rejected text-sm">{error}</p>}

      {!loading && !error && lecturers.length === 0 && (
        <div className="panel-admin">
          <p className="text-navy-700">No lecturer accounts yet. Create the first one.</p>
        </div>
      )}

      <div className="divide-y divide-navy-100 border border-navy-100">
        {lecturers.map((l) => (
          <div key={l.user_id} className="px-4 py-3 flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-navy">{l.full_name}</p>
              <p className="text-navy-600">{l.email}</p>
            </div>
            <span className="text-xs text-navy-600">
              {l.course_count ?? 0} course{l.course_count === 1 ? "" : "s"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
