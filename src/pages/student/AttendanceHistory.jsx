import React, { useEffect, useState } from "react";
import { getMyAttendance } from "../../api/client.js";

export default function AttendanceHistory() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyAttendance()
      .then(setRows)
      .catch(() => setError("Could not load your attendance history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-2xl mb-6">My Attendance History</h2>

      {loading && <p className="text-navy-600 text-sm">Loading…</p>}
      {error && <p className="text-rejected text-sm">{error}</p>}

      {!loading && !error && rows.length === 0 && (
        <div className="panel">
          <p className="text-navy-700">No attendance records yet.</p>
        </div>
      )}

      <div className="divide-y divide-navy-100 border border-navy-100">
        {rows.map((row) => (
          <div key={row.attendance_id} className="px-4 py-3 flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-navy">{row.course_code}</p>
              <p className="text-navy-600">{new Date(row.timestamp).toLocaleString()}</p>
            </div>
            <span
              className={`px-2 py-0.5 rounded-sm text-xs font-medium ${
                row.status === "PRESENT" ? "bg-present/10 text-present" : "bg-rejected/10 text-rejected"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
