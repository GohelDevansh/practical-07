

import RequestCard from "../components/RequestCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

function HospitalDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, fulfilled: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/requests");
      const requests = res.data.requests || [];
      setRecentRequests(requests.slice(0, 3));
      setStats({
        total: requests.length,
        pending: requests.filter((r) => r.status === "PENDING" || r.status === "OPEN").length,
        fulfilled: requests.filter((r) => r.status === "FULFILLED").length,
      });
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    const map = { PENDING: "badge-amber", FULFILLED: "badge-green", OPEN: "badge-red", CANCELLED: "badge-slate" };
    return map[status] || "badge-slate";
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <div className="dashboard-icon">🏥</div>
            <div>
              <h1>Hospital Dashboard</h1>
              <p style={{ color: "var(--text-muted)" }}>
                Welcome, <strong>{user?.name}</strong> — manage your blood requests.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 32 }}>
              <div className="stat-card">
                <span className="stat-label">Total Requests</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Pending</span>
                <span className="stat-value" style={{ color: "var(--amber-500)" }}>{stats.pending}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Fulfilled</span>
                <span className="stat-value" style={{ color: "var(--success)" }}>{stats.fulfilled}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions" style={{ marginBottom: 32 }}>
              <Link to="/create-request" className="action-card">
                <div className="action-icon">➕</div>
                <div>
                  <h3 style={{ fontSize: "0.9375rem" }}>New Blood Request</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Send a request to matched donors
                  </p>
                </div>
              </Link>

              <Link to="/matched-donors" className="action-card">
                <div className="action-icon">🔍</div>
                <div>
                  <h3 style={{ fontSize: "0.9375rem" }}>View Matched Donors</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Browse available donors nearby
                  </p>
                </div>
              </Link>

              <Link to="/history" className="action-card">
                <div className="action-icon">📋</div>
                <div>
                  <h3 style={{ fontSize: "0.9375rem" }}>Request History</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    View all past blood requests
                  </p>
                </div>
              </Link>
            </div>

            {/* Recent Requests */}
            {recentRequests.length > 0 && (
              <>
                <div className="section-header">
                  <h2>Recent Requests</h2>
                  <Link to="/history" className="btn btn-ghost btn-sm">View all →</Link>
                </div>
                {/* <div className="list">
                  {recentRequests.map((req) => (
                    <div key={req._id} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div className="blood-group blood-group-sm">{req.bloodGroup}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-strong)" }}>
                          {req.patientName}
                        </p>
                        <span className={`badge urgency-${req.urgency}`} style={{ fontSize: "0.7rem", marginTop: 4 }}>
                          {req.urgency}
                        </span>
                      </div>
                      <span className={`badge ${statusColor(req.status)}`}>{req.status}</span>
                    </div>
                  ))}
                </div> */}

                <div className="list">
  {recentRequests.map((req) => (
    <RequestCard
      key={req._id}
      request={req}
    />
  ))}
</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HospitalDashboard;