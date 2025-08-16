import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// ✅ ADMIN PROTECTION
const ProtectedAdmin = ({ children }) => {
    const authStorage = localStorage.getItem('auth_storage');
    const token = JSON.parse(authStorage)?.state?.token;
    // console.log('Parsed token:', token);
    const location = useLocation();

    let role;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (error) {
            console.error("Invalid token", error);
        }
    }

    if (!token || role !== "admin") {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};

// ✅ USER PROTECTION
const ProtectedUser = ({ children }) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
    const location = useLocation();

    let role;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (error) {
            console.error("Invalid token", error);
        }
    }

    if (!token || role !== "user") {
        return <Navigate to="/Login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};

export { ProtectedAdmin, ProtectedUser };
