import React, { createContext, useContext, useState, useCallback } from "react";
import { login as loginRequest } from "../api/client";

const AuthContext = createContext(null);

const ROLE_HOME = {
  STUDENT: "/sessions",
  LECTURER: "/lecturer/courses",
  ADMIN: "/admin/dashboard",
};

const ROLE_LOGIN = {
  STUDENT: "/login",
  LECTURER: "/lecturer/login",
  ADMIN: "/admin/login",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("attendance_user");
    return stored ? JSON.parse(stored) : null;
  });

  /**
   * Logs in and verifies the account's role matches the login page used
   * (e.g. a student account can't sign in at /lecturer/login). Returns the
   * user on success; throws with a readable message otherwise.
   */
  const login = useCallback(async (email, password, expectedRole) => {
    const data = await loginRequest(email, password);
    if (data.user.role !== expectedRole) {
      const correctPath = ROLE_LOGIN[data.user.role] || "/login";
      throw new Error(
        `This isn't a ${expectedRole.toLowerCase()} account. Sign in at ${correctPath} instead.`
      );
    }
    localStorage.setItem("attendance_token", data.access_token);
    localStorage.setItem("attendance_user", JSON.stringify(data.user));
    localStorage.setItem("attendance_role", data.user.role);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    const role = user?.role;
    localStorage.removeItem("attendance_token");
    localStorage.removeItem("attendance_user");
    localStorage.removeItem("attendance_role");
    setUser(null);
    return ROLE_LOGIN[role] || "/login";
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, ROLE_HOME }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
