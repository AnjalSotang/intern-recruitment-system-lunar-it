import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedAdmin = ({ children }) => {
  
  const authStorage = localStorage.getItem('auth_storage');
  const token = JSON.parse(authStorage)?.state?.token;
  const location = useLocation();

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded?.role || null;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // If logged in as admin and visiting /login → send to dashboard
  if (token && role === "admin" && location.pathname === "/login") {
    return <Navigate to="/admin/dashboards" replace />;
  }

  // If not logged in or not admin → block
  if (!token || role !== "admin") {
    // ⚠️ Prevent redirect loop: only redirect if not already on /login
    if (location.pathname !== "/login") {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

  return <>{children}</>;
};

export { ProtectedAdmin };
