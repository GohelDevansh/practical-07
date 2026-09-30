// import { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import api from "../services/api";

// import { useAuth } from "../context/AuthContext";

// import Alert from "../components/Alert";

// function Login() {

//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const [error, setError] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [formData, setFormData] =
//     useState({
//       email: "",
//       password: ""
//     });

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value
//     });

//   };

//   const handleSubmit = async (
//     e
//   ) => {

//     e.preventDefault();

//     setError("");

//     try {

//       setLoading(true);

//       const response =
//         await api.post(
//           "/auth/login",
//           formData
//         );

//       login(
//         response.data.token,
//         response.data.user
//       );

//       if (
//         response.data.user.role ===
//         "donor"
//       ) {
//         navigate("/donor");
//       } else {
//         navigate("/hospital");
//       }

//     } catch (error) {

//       setError(
//         error.response?.data
//           ?.message ||
//           "Login failed"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div>

//       <h2>Login</h2>

//       <Alert
//         type="error"
//         message={error}
//       />

//       <form
//         onSubmit={handleSubmit}
//       >

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={
//             handleChange
//           }
//         />

//         <br />
//         <br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={
//             handleChange
//           }
//         />

//         <br />
//         <br />

//         <button
//           disabled={loading}
//         >
//           {loading
//             ? "Loading..."
//             : "Login"}
//         </button>

//       </form>

//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      login(response.data.token, response.data.user);
      const dest = response.data.user.role === "donor" ? "/donor" : "/hospital";
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">🩸</div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.25rem" }}>BloodNet</h2>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}>Smart Blood Donation Network</p>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Sign in to your account</p>
        </div>

        {error && <div style={{ marginBottom: 20 }}><Alert type="error" message={error} onClose={() => setError("")} /></div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`}
            disabled={loading}
          >
            {!loading && "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" style={{ fontWeight: 600 }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;