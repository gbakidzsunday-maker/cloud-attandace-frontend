import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

// Attach the JWT to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("attendance_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to the right login page on an expired/invalid token.
/**
 * FastAPI returns `detail` as a string for most errors, but as a list of
 * objects ({ loc, msg, type, input, ctx }) for request-validation errors (422).
 * Rendering that list directly crashes React, so turn it into a plain string.
 */
function normaliseDetail(detail) {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") return item;
        const field = Array.isArray(item?.loc) ? item.loc.filter((p) => p !== "body").join(".") : "";
        const msg = item?.msg || "Invalid value";
        return field ? `${field}: ${msg}` : msg;
      })
      .join("; ");
  }
  if (detail && typeof detail === "object" && detail.msg) return detail.msg;
  return null;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const message = normaliseDetail(error.response.data.detail);
      if (message) error.response.data.detail = message;
    }
    if (error.response && error.response.status === 401) {
      const role = localStorage.getItem("attendance_role");
      localStorage.removeItem("attendance_token");
      localStorage.removeItem("attendance_user");
      localStorage.removeItem("attendance_role");
      const loginPath =
        role === "LECTURER" ? "/lecturer/login" : role === "ADMIN" ? "/admin/login" : "/login";
      window.location.href = loginPath;
    }
    return Promise.reject(error);
  }
);

export default api;

// ---- Auth ----
export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const registerStudent = (payload) =>
  api.post("/auth/register", payload).then((res) => res.data);

// ---- Student ----
export const getActiveSessions = () =>
  api.get("/sessions/active").then((res) => res.data);

export const checkIn = (payload) =>
  api.post("/attendance/checkin", payload).then((res) => res.data);

export const getMyAttendance = () =>
  api.get("/attendance/me").then((res) => res.data);

// ---- Lecturer ----
export const getCourses = () => api.get("/courses").then((res) => res.data);

export const createCourse = (payload) =>
  api.post("/courses", payload).then((res) => res.data);

export const enrolStudent = (courseCode, payload) =>
  api.post(`/courses/${courseCode}/enrol`, payload).then((res) => res.data);

export const startSession = (payload) =>
  api.post("/sessions", payload).then((res) => res.data);

export const closeSession = (sessionId) =>
  api.patch(`/sessions/${sessionId}/close`).then((res) => res.data);

export const getSessionReport = (sessionId) =>
  api.get(`/reports/session/${sessionId}`).then((res) => res.data);

export const getCourseReport = (courseCode) =>
  api.get(`/reports/course/${courseCode}`).then((res) => res.data);

// ---- Admin ----
// Requires backend support: role ADMIN, and these two endpoints.
// See README.md "Backend additions needed" section.
export const getLecturers = () =>
  api.get("/admin/lecturers").then((res) => res.data);

export const createLecturer = (payload) =>
  api.post("/admin/lecturers", payload).then((res) => res.data);
