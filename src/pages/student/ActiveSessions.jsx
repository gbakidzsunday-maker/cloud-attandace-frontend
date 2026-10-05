import React, { useEffect, useState } from "react";
import { getActiveSessions } from "../../api/client.js";
import SessionCard from "../../components/SessionCard.jsx";

export default function ActiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getActiveSessions()
      .then(setSessions)
      .catch(() => setError("Could not load active sessions."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-2xl mb-6">Active Sessions</h2>

      {loading && <p className="text-navy-600 text-sm">Checking for open sessions…</p>}
      {error && <p className="text-rejected text-sm">{error}</p>}

      {!loading && !error && sessions.length === 0 && (
        <div className="panel">
          <p className="text-navy-700">
            No open sessions right now. Once your lecturer starts one for a course
            you're enrolled in, it will appear here.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard key={session.session_id} session={session} />
        ))}
      </div>
    </div>
  );
}
