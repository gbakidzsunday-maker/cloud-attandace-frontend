import React, { useState } from "react";
import { getCourseReport } from "../../api/client.js";
import ReportTable from "../../components/ReportTable.jsx";

export default function Reports() {
  const [courseCode, setCourseCode] = useState("");
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await getCourseReport(courseCode.trim());
      setRows(data);
    } catch {
      setError("Could not find a report for that course code.");
      setRows(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl mb-6">Attendance Reports</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
        <input className="field-input" placeholder="Course code, e.g. CSC 301" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
        <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
          {loading ? "Loading…" : "View report"}
        </button>
      </form>
      {error && <p className="text-sm text-rejected mb-4">{error}</p>}
      {rows !== null && <ReportTable rows={rows} />}
    </div>
  );
}
