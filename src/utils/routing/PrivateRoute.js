import React from "react";
import { Navigate } from "react-router-dom";
import logout from "../logout";
import jwtDecode from "jwt-decode";

export function PrivateRoute({ element, roles = [] }) {
    try {
        const token = sessionStorage.getItem("token");
        if (token === "") {
            sessionStorage.removeItem("token");
            return <Navigate to="/login" />;
        }
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            logout();
            return <Navigate to="/login" />;
        }
        const role = decodedToken.role;
        if (roles.includes(role)) {
            return element;
        }
        return <Navigate to="/404" />;
    } catch {
        return <Navigate to="/login" />;
    }
}
