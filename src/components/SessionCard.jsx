import React from "react";
import { Link } from "react-router-dom";

export default function SessionCard({ session }) {
  return (
    <div className="panel flex items-center justify-between">
      <div>
        <p className="text-xs text-navy-600 font-medium">{session.course_code}</p>
        <h3 className="text-lg font-display text-navy">{session.course_title}</h3>
        <p className="text-sm text-navy-600">
          Opened {new Date(session.opened_at).toLocaleTimeString()}
        </p>
      </div>
      <Link to={`/sessions/${session.session_id}/checkin`} className="btn-primary">
        Check in
      </Link>
    </div>
  );
}
