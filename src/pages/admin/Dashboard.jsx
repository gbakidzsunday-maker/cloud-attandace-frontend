import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl mb-1">Welcome, {user.full_name || "Admin"}</h2>
      <p className="text-sm text-navy-600 mb-8">
        Department of Computer Science administration.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/admin/lecturers" className="panel-admin block hover:bg-plum-50 transition-colors">
          <h3 className="text-lg font-display text-navy mb-1">Manage Lecturers</h3>
          <p className="text-sm text-navy-600">
            View existing lecturer accounts and their assigned courses.
          </p>
        </Link>
        <Link to="/admin/lecturers/new" className="panel-admin block hover:bg-plum-50 transition-colors">
          <h3 className="text-lg font-display text-navy mb-1">Create Lecturer Account</h3>
          <p className="text-sm text-navy-600">
            Add a new lecturer so they can sign in and start taking attendance.
          </p>
        </Link>
      </div>
    </div>
  );
}
