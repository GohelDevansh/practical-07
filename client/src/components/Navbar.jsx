// import {
//   Link,
//   useNavigate
// } from "react-router-dom";

// import {
//   useAuth
// } from "../context/AuthContext";

// function Navbar() {

//   const navigate =
//     useNavigate();

//   const { logout } =
//     useAuth();

//   const handleLogout =
//     () => {

//       logout();

//       navigate("/login");

//     };

//   return (
//     <nav>

//       <Link to="/">
//         Home
//       </Link>

//       <button
//         onClick={
//           handleLogout
//         }
//       >
//         Logout
//       </button>

//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel = user?.role === "donor" ? "Donor" : "Hospital";
  const dashboardPath = user?.role === "donor" ? "/donor" : "/hospital";

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to={dashboardPath} className="navbar-logo">
            <div className="navbar-logo-icon">🩸</div>
            <span>BloodNet</span>
          </Link>

          <div className="navbar-actions">
            {user && (
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  padding: "6px 12px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                }}
              >
                {user.name} · <strong style={{ color: "var(--accent)" }}>{roleLabel}</strong>
              </span>
            )}
            <button onClick={handleLogout} className="btn btn-ghost btn-sm">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;