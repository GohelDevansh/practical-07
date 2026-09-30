import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

function CreateDonorProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    bloodGroup: "",
    phone: "",
    city: "",
    availability: true,
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

 

  



  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));

        setLocating(false);
      },
      () => {
        setError("Could not detect location.");
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.bloodGroup ||
      !formData.phone ||
      !formData.city ||
      !formData.latitude ||
      !formData.longitude
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/donors", {
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        city: formData.city,
        availability: formData.availability,
        location: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
      });

      console.log(response.data);

      setSuccess("Donor profile created successfully!");

      setTimeout(() => {
        navigate("/donor");
      }, 1500);
    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
          "Failed to create donor profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div
        className="container main-content"
        style={{ maxWidth: "600px" }}
      >
        <div style={{ marginBottom: "25px" }}>
          <Link
            to="/donor"
            className="btn btn-ghost btn-sm"
          >
            ← Back
          </Link>

          <h1>Donor Profile</h1>

          <p>Create your donor profile.</p>
        </div>

        <div className="card card-elevated">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
            />
          )}

          {success && (
            <Alert
              type="success"
              message={success}
            />
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div className="form-group">
              <label>Blood Group *</label>

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">
                  Select Blood Group
                </option>

                {BLOOD_GROUPS.map((group) => (
                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number *</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>

            <div className="form-group">
              <label>City *</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ahmedabad"
              />
            </div>

            <div>
              <label>Location *</label>

              <br />

              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                className="btn btn-secondary"
              >
                {locating
                  ? "Detecting..."
                  : "📍 Detect My Location"}
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  step="any"
                  name="longitude"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>
                  Available to Donate
                </strong>

                <br />

                <small>
                  Hospitals can contact you
                </small>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />

                <span
                  style={{
                    fontWeight: "bold",
                    color: formData.availability
                      ? "green"
                      : "red",
                  }}
                >
                  {formData.availability
                    ? "ON"
                    : "OFF"}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDonorProfile;