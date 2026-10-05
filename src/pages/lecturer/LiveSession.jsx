import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSessionReport, closeSession } from "../../api/client.js";
import ReportTable from "../../components/ReportTable.jsx";

const POLL_MS = 5000;

export default function LiveSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(() => {
    getSessionReport(sessionId).then(setRows).catch(() => setError("Could not refresh attendance."));
  }, [sessionId]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const presentCount = rows.filter((r) => r.status === "PRESENT").length;

  const handleClose = async () => {
    setClosing(true);
    try {
      await closeSession(sessionId);
      navigate("/lecturer/courses");
    } catch {
      setError("Could not close the session. Please try again.");
      setClosing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl">Live Session</h2>
          <p className="text-sm text-navy-600">
            {presentCount} student{presentCount === 1 ? "" : "s"} checked in so far &nbsp;·&nbsp; refreshing every {POLL_MS / 1000}s
          </p>
        </div>
        <button onClick={handleClose} disabled={closing} className="btn-primary">
          {closing ? "Closing…" : "Close session"}
        </button>
      </div>
      {error && <p className="text-sm text-rejected mb-4">{error}</p>}
      <ReportTable rows={rows} />
    </div>
  );
}
