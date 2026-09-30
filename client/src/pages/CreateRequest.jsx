


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function CreateRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    urgency: "HIGH",
    city: "",
    latitude: "",
    longitude: "",
    unitsRequired: 1,
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((f) => ({
          ...f,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setLocating(false);
      },
      () => {
        setError("Could not detect location. Please enter manually.");
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.bloodGroup || !formData.latitude || !formData.longitude) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/requests", {
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        urgency: formData.urgency,
        city : formData.city,
        unitsNeeded: Number(formData.unitsRequired),
        notes: formData.notes,
        location: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
      });
      setSuccess("Request sent! Matching donors will be notified.");
      setTimeout(() => navigate("/hospital"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container main-content" style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 28 }}>
          <Link to="/hospital" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, marginBottom: 16 }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "1.75rem" }}>New Blood Request</h1>
          <p style={{ color: "var(--text-muted)" }}>Fill in the details to notify matching donors nearby.</p>
        </div>

        <div className="card card-elevated">
          {error && <div style={{ marginBottom: 20 }}><Alert type="error" message={error} onClose={() => setError("")} /></div>}
          {success && <div style={{ marginBottom: 20 }}><Alert type="success" message={success} /></div>}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }} noValidate>
            <div className="form-group">
              <label htmlFor="patientName">Patient Name *</label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                placeholder="Full name of patient"
                value={formData.patientName}
                onChange={handleChange}
                autoFocus
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group *</label>
                <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="urgency">Urgency Level *</label>
                <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange}>
                  <option value="HIGH">HIGH — Emergency</option>
                  <option value="MEDIUM">MEDIUM — Within 24h</option>
                  <option value="LOW">LOW — Scheduled</option>
                </select>
              </div>
            </div>
                <div className="form-group">
  <label htmlFor="city">City *</label>
  <input
    id="city"
    name="city"
    type="text"
    placeholder="Enter city"
    value={formData.city}
    onChange={handleChange}
  />
</div>
            <div className="form-group">
              <label htmlFor="unitsRequired">Units Required</label>
              <input
                id="unitsRequired"
                name="unitsRequired"
                type="number"
                min="1"
                max="20"
                value={formData.unitsRequired}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label style={{ marginBottom: 10, display: "block" }}>Hospital Location *</label>
              <button
                type="button"
                onClick={detectLocation}
                className={`btn btn-secondary btn-sm ${locating ? "btn-loading" : ""}`}
                disabled={locating}
                style={{ marginBottom: 12 }}
              >
                {!locating && "📍 Use current location"}
              </button>
              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 23.0225"
                    value={formData.latitude}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 72.5714"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Any special requirements or notes..."
                value={formData.notes}
                onChange={handleChange}
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`}
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              {!loading && "🩸 Send Blood Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;