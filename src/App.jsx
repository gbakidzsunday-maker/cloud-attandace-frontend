import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

// Auth
import StudentLogin from "./pages/auth/StudentLogin.jsx";
import LecturerLogin from "./pages/auth/LecturerLogin.jsx";
import AdminLogin from "./pages/auth/AdminLogin.jsx";

// Student
import ActiveSessions from "./pages/student/ActiveSessions.jsx";
import CheckIn from "./pages/student/CheckIn.jsx";
import AttendanceHistory from "./pages/student/AttendanceHistory.jsx";

// Lecturer
import CourseList from "./pages/lecturer/CourseList.jsx";
import CreateCourse from "./pages/lecturer/CreateCourse.jsx";
import EnrolStudents from "./pages/lecturer/EnrolStudents.jsx";
import StartSession from "./pages/lecturer/StartSession.jsx";
import LiveSession from "./pages/lecturer/LiveSession.jsx";
import Reports from "./pages/lecturer/Reports.jsx";

// Admin
import Dashboard from "./pages/admin/Dashboard.jsx";
import LecturerList from "./pages/admin/LecturerList.jsx";
import CreateLecturer from "./pages/admin/CreateLecturer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <Routes>
        {/* Student is the main entry point */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/lecturer/login" element={<LecturerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Student area */}
        <Route
          path="/sessions"
          element={
            <ProtectedRoute allowedRole="STUDENT" loginPath="/login">
              <ActiveSessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sessions/:sessionId/checkin"
          element={
            <ProtectedRoute allowedRole="STUDENT" loginPath="/login">
              <CheckIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRole="STUDENT" loginPath="/login">
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />

        {/* Lecturer area */}
        <Route
          path="/lecturer/courses"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <CourseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/courses/new"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/courses/:courseCode/enrol"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <EnrolStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/courses/:courseCode/session"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <StartSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/sessions/:sessionId"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <LiveSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/reports"
          element={
            <ProtectedRoute allowedRole="LECTURER" loginPath="/lecturer/login">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Admin area */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN" loginPath="/admin/login">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lecturers"
          element={
            <ProtectedRoute allowedRole="ADMIN" loginPath="/admin/login">
              <LecturerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lecturers/new"
          element={
            <ProtectedRoute allowedRole="ADMIN" loginPath="/admin/login">
              <CreateLecturer />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
