


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import socket from "../services/socket";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

function DonorDashboard() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [responding, setResponding] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // useEffect(() => {
  //   fetchProfile();

  //   socket.on("newBloodRequest", (data) => {
  //     setNotification(data);
  //   });

  //   return () => {
  //     socket.off("newBloodRequest");
  //   };
  // }, []);

    useEffect(() => {
  fetchProfile();
  fetchRequests();

  socket.on("newBloodRequest", (data) => {
    setNotification(data);
    fetchRequests();
  });

  return () => {
    socket.off("newBloodRequest");
  };
}, []);

//     const fetchRequests = async () => {
//   try {
//     const res = await api.get("/requests");

//     setRequests(
//       res.data.requests.filter(
//         (r) => r.status === "OPEN"
//       )
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };
const fetchRequests = async () => {
  try {
    const res = await api.get("/requests");

    console.log("REQUESTS =", res.data.requests);

    setRequests(res.data.requests || []);
  } catch (error) {
    console.error("Request fetch error:", error);
  }
};
  const fetchProfile = async () => {
  try {
    const res = await api.get("/donors/me");

    console.log("Profile Response:", res.data);

    setProfile(res.data.donor);
  } catch (error) {
    console.error("Profile fetch error:", error);
  } finally {
    setLoadingProfile(false);
  }
};

  

  const respond = async (status) => {
    if (!notification?.requestId) return;
    setResponding(true);
    try {
      await api.post("/responses/respond", {
        requestId: notification.requestId,
        status,
      });
      setStatusMsg(status === "ACCEPTED" ? "Response sent — thank you!" : "Response recorded.");
      setNotification(null);
      setTimeout(() => setStatusMsg(""), 3000);
    } catch {
      setStatusMsg("Could not send response. Please try again.");
    } finally {
      setResponding(false);
    }
  };

  // const toggleAvailability = async () => {
  //   if (!profile) return;
  //   try {
  //     // const res = await api.patch("/donors/availability", {
  //     await api.put("/donors/availability", {
  //       availability: !profile.availability,
  //     });
  //     setProfile((p) => ({ ...p, availability: res.data.donor?.availability ?? !p.availability }));
  //   } catch {
  //     /* ignore */
  //   }
  // };
//   const toggleAvailability = async () => {
//   if (!profile) return;

//   try {
//     await api.put("/donors/availability", {
//       availability: !profile.availability,
//     });

//     setProfile((p) => ({
//       ...p,
//       availability: res.data.donor?.availability ?? !p.availability,
//     }));
//   } catch (error) {
//     console.error(error);
//   }
// };
  const toggleAvailability = async () => {
  if (!profile) return;

  try {
    const res = await api.put("/donors/availability", {
      availability: !profile.availability,
    });

    setProfile((p) => ({
      ...p,
      availability:
        res.data.donor?.availability ?? !p.availability,
    }));
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="page">
      <Navbar />
      <Notification
        data={notification}
        onAccept={() => !responding && respond("ACCEPTED")}
        onDecline={() => !responding && respond("DECLINED")}
      />

      <div className="container main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <div className="dashboard-icon">🩸</div>
            <div>
              <h1>Donor Dashboard</h1>
              <p style={{ color: "var(--text-muted)" }}>
                Hello, <strong>{user?.name}</strong> — every drop counts.
              </p>
            </div>
          </div>
        </div>

        {statusMsg && (
          <div style={{ marginBottom: 20 }}>
            <div className="alert alert-success">{statusMsg}</div>
          </div>
        )}

        {loadingProfile ? (
          <Loader text="Loading your profile..." />
        ) : profile ? (
          <>
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Blood Group</span>
                <span className="stat-value accent">{profile.bloodGroup}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Status</span>
                <div style={{ marginTop: 4 }}>
                  <span className={`badge ${profile.availability ? "badge-green" : "badge-slate"}`} style={{ fontSize: "0.875rem" }}>
                    {profile.availability ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-label">Donor Score</span>
                <span className="stat-value">{profile.score ?? "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Phone</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.9rem", color: "var(--text-strong)" }}>
                  {profile.phone || "—"}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <button onClick={toggleAvailability} className="action-card" style={{ textAlign: "left" }}>
                <div className="action-icon">{profile.availability ? "🔔" : "🔕"}</div>
                <div>
                  <h3 style={{ fontSize: "0.9375rem" }}>{profile.availability ? "Set Unavailable" : "Set Available"}</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Toggle your donation availability
                  </p>
                </div>
              </button>

              <Link to="/create-donor" className="action-card">
                <div className="action-icon">✏️</div>
                <div>
                  <h3 style={{ fontSize: "0.9375rem" }}>Update Profile</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Edit your blood group & location
                  </p>
                </div>
              </Link>
            </div>

            <div className="section-header">
  <h2>Available Blood Requests</h2>
</div>

<div className="list">
  {requests.map((req) => (
    <div
      key={req._id}
      className="card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3>{req.patientName}</h3>

        <p>
          {req.bloodGroup} • {req.city}
        </p>

        <p>
          Urgency: {req.urgency}
        </p>
      </div>

      <Link
        to={`/request/${req._id}`}
        className="btn btn-primary btn-sm"
      >
        View
      </Link>
    </div>
  ))}
</div>
          </>


        ) : (
          /* No profile yet */
          <div className="card card-elevated" style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>👤</div>
            <h2 style={{ marginBottom: 8 }}>Complete your profile</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
              Set up your donor profile to start receiving blood requests in your area.
            </p>
            <Link to="/create-donor" className="btn btn-primary btn-lg">
              Create Donor Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorDashboard;