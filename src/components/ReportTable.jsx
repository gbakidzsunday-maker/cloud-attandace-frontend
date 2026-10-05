import React from "react";

export default function ReportTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="text-navy-600 text-sm py-6">No attendance records yet for this selection.</p>;
  }

  return (
    <div className="overflow-x-auto border border-navy-100">
      <table className="min-w-full text-sm">
        <thead className="bg-navy-50 text-navy-700 text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Student</th>
            <th className="px-4 py-2 font-medium">Course</th>
            <th className="px-4 py-2 font-medium">Timestamp</th>
            <th className="px-4 py-2 font-medium">Distance</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.attendance_id} className="border-t border-navy-100">
              <td className="px-4 py-2">{row.student_name}</td>
              <td className="px-4 py-2">{row.course_code}</td>
              <td className="px-4 py-2">{new Date(row.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2">{row.distance_metres.toFixed(1)} m</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-0.5 rounded-sm text-xs font-medium ${
                    row.status === "PRESENT" ? "bg-present/10 text-present" : "bg-rejected/10 text-rejected"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
