import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

/**
 * Guards a route to a specific role. An unauthenticated visitor is sent to
 * that area's own login page; a signed-in user of the *wrong* role is sent
 * to their own home rather than a login page they'd bounce straight off.
 */
export default function ProtectedRoute({ allowedRole, loginPath, children }) {
  const { user, ROLE_HOME } = useAuth();

  if (!user) return <Navigate to={loginPath} replace />;
  if (user.role !== allowedRole) return <Navigate to={ROLE_HOME[user.role]} replace />;

  return children;
}
