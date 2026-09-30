// import { Link } from "react-router-dom";


// function RequestCard({ request }) {
//   const statusColors = {
//     PENDING: "badge-amber",
//     FULFILLED: "badge-green",
//     CANCELLED: "badge-slate",
//     OPEN: "badge-red",
//   };

//   const formattedDate = request.createdAt
//     ? new Date(request.createdAt).toLocaleDateString("en-IN", {
//         day: "numeric", month: "short", year: "numeric"
//       })
//     : null;

//   return (
//     <div className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
//       <div className="blood-group blood-group-sm" aria-label={`Blood group ${request.bloodGroup}`}>
//         {request.bloodGroup}
//       </div>

//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
//           <h3 style={{ fontSize: "0.9375rem", margin: 0 }}>{request.patientName || "Patient"}</h3>
//           <span className={`badge ${statusColors[request.status] || "badge-slate"}`}>
//             {request.status}
//           </span>
//         </div>

//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
//           <span className={`badge urgency-${request.urgency}`} style={{ fontSize: "0.75rem" }}>
//             {request.urgency} urgency
//           </span>
//           {formattedDate && (
//             <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
//               📅 {formattedDate}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestCard;

import { Link } from "react-router-dom";

function RequestCard({ request }) {
  const statusColors = {
    PENDING: "badge-amber",
    FULFILLED: "badge-green",
    CANCELLED: "badge-slate",
    OPEN: "badge-red",
  };

  const formattedDate = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      to={`/request/${request._id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        className="card"
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <div
          className="blood-group blood-group-sm"
          aria-label={`Blood group ${request.bloodGroup}`}
        >
          {request.bloodGroup}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                fontSize: "0.9375rem",
                margin: 0,
              }}
            >
              {request.patientName || "Patient"}
            </h3>

            <span
              className={`badge ${
                statusColors[request.status] || "badge-slate"
              }`}
            >
              {request.status}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              className={`badge urgency-${request.urgency}`}
              style={{ fontSize: "0.75rem" }}
            >
              {request.urgency} urgency
            </span>

            {formattedDate && (
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                📅 {formattedDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RequestCard;