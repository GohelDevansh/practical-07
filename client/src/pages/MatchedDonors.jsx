// import { useEffect, useState } from "react";

// import api from "../services/api";

// import DonorCard from "../components/DonorCard";

// function MatchedDonors() {

//   const [donors, setDonors] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   useEffect(() => {

//     fetchDonors();

//   }, []);

//   const fetchDonors =
//     async () => {

//       try {

//         const response =
//           await api.get(
//             "/donors/matched"
//           );

//         setDonors(
//           response.data.donors
//         );

//       } catch (error) {

//         console.log(error);

//       }
//     };

//   const filteredDonors =
//     donors.filter((donor) =>
//       donor.bloodGroup
//         ?.toLowerCase()
//         .includes(
//           search.toLowerCase()
//         )
//     );

//   return (
//     <div>

//       <h1>
//         Matched Donors
//       </h1>

//       <input
//         type="text"
//         placeholder="Search Blood Group"
//         value={search}
//         onChange={(e)=>
//           setSearch(
//             e.target.value
//           )
//         }
//       />

//       {filteredDonors.map(
//         (donor) => (
//           <DonorCard
//             key={donor._id}
//             donor={donor}
//           />
//         )
//       )}

//     </div>
//   );
// }

// export default MatchedDonors;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DonorCard from "../components/DonorCard";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const BLOOD_GROUPS = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function MatchedDonors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await api.get("/donors/matched");
      setDonors(response.data.donors || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load donors.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = donors.filter((donor) => {
    const matchesSearch =
      !search ||
      donor.name?.toLowerCase().includes(search.toLowerCase()) ||
      donor.bloodGroup?.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = !filterGroup || donor.bloodGroup === filterGroup;
    return matchesSearch && matchesGroup;
  });

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
              <h1 style={{ fontSize: "1.75rem" }}>Matched Donors</h1>
              <p style={{ color: "var(--text-muted)" }}>
                {loading ? "Loading..." : `${filtered.length} donor${filtered.length !== 1 ? "s" : ""} found`}
              </p>
            </div>
            <button onClick={fetchDonors} className="btn btn-secondary btn-sm" disabled={loading}>
              ↻ Refresh
            </button>
          </div>
        </div>

        {error && <div style={{ marginBottom: 20 }}><Alert type="error" message={error} /></div>}

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <span className="search-icon">🔍</span>
            <input
              type="search"
              placeholder="Search by name or blood group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search donors"
            />
          </div>
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            style={{ width: "auto", minWidth: 140 }}
            aria-label="Filter by blood group"
          >
            <option value="">All blood groups</option>
            {BLOOD_GROUPS.filter(Boolean).map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader text="Finding matched donors..." />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🩸</div>
            <h3>No donors found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="list">
            {filtered.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchedDonors;