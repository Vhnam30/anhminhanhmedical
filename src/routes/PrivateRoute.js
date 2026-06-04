import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  console.log("🔐 PrivateRoute check - Token:", !!token); // Debug

  if (!token) {
    console.log("🚫 No token → Redirect to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log("✅ Token OK → Render children");
  return children;
}

export default PrivateRoute;