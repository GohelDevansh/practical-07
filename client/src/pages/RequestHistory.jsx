


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import RequestCard from "../components/RequestCard";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      // const response = await api.get("/requests");
      const response = await api.get("/requests");
      setRequests(response.data.requests || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load request history.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = requests.filter((r) => !filterStatus || r.status === filterStatus);

  const statusCounts = requests.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page">
      <Navbar />
      <div className="container main-content">
        <div style={{ marginBottom: 28 }}>
          <Link to="/hospital" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, marginBottom: 16 }}>
            ← Back to Dashboard
          </Link>
          <div className="section-header">
            <div>
              <h1 style={{ fontSize: "1.75rem" }}>Request History</h1>
              <p style={{ color: "var(--text-muted)" }}>
                {loading ? "Loading..." : `${filtered.length} request${filtered.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <Link to="/create-request" className="btn btn-primary btn-sm">
              + New Request
            </Link>
          </div>
        </div>

        {error && <div style={{ marginBottom: 20 }}><Alert type="error" message={error} /></div>}

        {/* Summary chips */}
        {!loading && requests.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
                className={`badge ${filterStatus === status ? "badge-red" : "badge-slate"}`}
                style={{ border: "1px solid var(--border)", cursor: "pointer", padding: "4px 12px", fontSize: "0.8125rem" }}
              >
                {status} ({count})
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <Loader text="Loading request history..." />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No requests yet</h3>
            <p style={{ marginBottom: 20 }}>Create your first blood request to get started.</p>
            <Link to="/create-request" className="btn btn-primary">
              Create Request
            </Link>
          </div>
        ) : (
          <div className="list">
            {filtered.map((req) => (
              <RequestCard key={req._id} request={req} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestHistory;