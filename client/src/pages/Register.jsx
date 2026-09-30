// import { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import api from "../services/api";

// import Alert from "../components/Alert";

// function Register() {

//   const navigate = useNavigate();

//   const [error, setError] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [formData, setFormData] =
//     useState({
//       name: "",
//       email: "",
//       password: "",
//       role: "donor"
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

//       await api.post(
//         "/auth/register",
//         formData
//       );

//       navigate("/login");

//     } catch (error) {

//       setError(
//         error.response?.data
//           ?.message ||
//           "Registration failed"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div>

//       <h2>Register</h2>

//       <Alert
//         type="error"
//         message={error}
//       />

//       <form
//         onSubmit={handleSubmit}
//       >

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={
//             handleChange
//           }
//         />

//         <br />
//         <br />

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

//         <select
//           name="role"
//           onChange={
//             handleChange
//           }
//         >
//           <option value="donor">
//             Donor
//           </option>

//           <option value="hospital">
//             Hospital
//           </option>
//         </select>

//         <br />
//         <br />

//         <button
//           disabled={loading}
//         >
//           {loading
//             ? "Loading..."
//             : "Register"}
//         </button>

//       </form>

//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Alert from "../components/Alert";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
          <h1 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Create account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Join the network and save lives</p>
        </div>

        {error && <div style={{ marginBottom: 20 }}><Alert type="error" message={error} onClose={() => setError("")} /></div>}
        {success && <div style={{ marginBottom: 20 }}><Alert type="success" message={success} /></div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
          </div>

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
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="donor">Blood Donor</option>
              <option value="hospital">Hospital / Blood Bank</option>
            </select>
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`}
            disabled={loading}
          >
            {!loading && "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;