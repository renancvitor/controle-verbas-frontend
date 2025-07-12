import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
    const token = sessionStorage.getItem("token");
    return token ? <>{children}</> : <Navigate to="/login" replace />;
}
