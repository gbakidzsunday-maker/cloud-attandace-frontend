import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../api/client.js";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(() => setError("Could not load courses. Check your connection and try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">My Courses</h2>
        <Link to="/lecturer/courses/new" className="btn-primary">+ New course</Link>
      </div>

      {loading && <p className="text-navy-600 text-sm">Loading courses…</p>}
      {error && <p className="text-rejected text-sm">{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <div className="panel">
          <p className="text-navy-700">You haven't created a course yet. Create one to start taking attendance.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.course_code} className="panel flex flex-col gap-3">
            <div>
              <p className="text-xs text-navy-600 font-medium">{course.course_code}</p>
              <h3 className="text-lg font-display text-navy">{course.title}</h3>
              <p className="text-sm text-navy-600">{course.unit} unit(s)</p>
            </div>
            <div className="flex gap-3 mt-auto pt-2">
              <Link to={`/lecturer/courses/${course.course_code}/enrol`} className="text-sm text-navy-600 underline underline-offset-2">
                Enrol students
              </Link>
              <Link to={`/lecturer/courses/${course.course_code}/session`} className="text-sm text-gold-600 underline underline-offset-2">
                Start session
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
