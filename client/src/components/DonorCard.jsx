// function DonorCard({ donor }) {
//   return (
//     <div className="card">

//       <h3>
//         {donor.name || "Donor"}
//       </h3>

//       <p>
//         Blood Group:
//         {donor.bloodGroup}
//       </p>

//       <p>
//         Phone:
//         {donor.phone}
//       </p>

//       <p>
//         Score:
//         {donor.score}
//       </p>

//       <p>
//         Status:
//         {
//           donor.availability
//           ? "Available"
//           : "Unavailable"
//         }
//       </p>

//     </div>
//   );
// }

// export default DonorCard;


function DonorCard({ donor }) {
  return (
    <div className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div className="blood-group blood-group-sm" aria-label={`Blood group ${donor.bloodGroup}`}>
        {donor.bloodGroup}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
          <h3 style={{ fontSize: "0.9375rem", margin: 0 }}>{donor.name || "Anonymous Donor"}</h3>
          <span className={`badge ${donor.availability ? "badge-green" : "badge-slate"}`}>
            {donor.availability ? "Available" : "Unavailable"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {donor.phone && (
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              📞 {donor.phone}
            </span>
          )}
          {donor.score !== undefined && (
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              ⭐ Score: <strong style={{ color: "var(--text-strong)", fontFamily: "var(--mono)" }}>{donor.score}</strong>
            </span>
          )}
          {donor.distance !== undefined && (
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              📍 {typeof donor.distance === "number" ? `${donor.distance.toFixed(1)} km` : donor.distance}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonorCard;