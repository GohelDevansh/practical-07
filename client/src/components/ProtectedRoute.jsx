// import {
//   Navigate
// } from "react-router-dom";

// import {
//   useAuth
// } from "../context/AuthContext";

// function ProtectedRoute({
//   children
// }) {

//   const {
//     user,
//     loading
//   } = useAuth();

//   if (loading) {
//     return (
//       <p>Loading...</p>
//     );
//   }

//   if (!user) {
//     return (
//       <Navigate
//         to="/login"
//       />
//     );
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-ring"></div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // Role-based guard
  if (allowedRole && user.role !== allowedRole) {
    const redirect = user.role === "donor" ? "/donor" : "/hospital";
    return <Navigate to={redirect} replace />;
  }

  return children;
}

export default ProtectedRoute;