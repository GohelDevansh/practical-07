// function Notification({
//   notification,
//   onClose
// }) {

//   if (!notification) return null;

//   return (
//     <div className="notification">

//       <h3>
//         🚨 Emergency Alert
//       </h3>

//       <p>
//         Blood Group:
//         {notification.bloodGroup}
//       </p>

//       <p>
//         Urgency:
//         {notification.urgency}
//       </p>

//       <button
//         onClick={onClose}
//       >
//         Close
//       </button>

//     </div>
//   );
// }
// const [count, setCount] =
// useState(0);

// setCount(prev => prev + 1);
// <span>
//  Notifications:
//  {count}
// </span>
// export default Notification;


function Notification({ data, onAccept, onDecline }) {
  if (!data) return null;

  return (
    <div className="notification-banner" role="alert" aria-live="assertive">
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 38, height: 38, background: "var(--accent)",
            borderRadius: "var(--radius)", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", flexShrink: 0,
          }}
        >
          🩸
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="notification-pulse"></span>
            <strong style={{ fontSize: "0.8125rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              New Request
            </strong>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--text-strong)", fontWeight: 600, marginBottom: 2 }}>
            Blood needed: <span style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}>{data.bloodGroup}</span>
          </p>
          {data.hospital && (
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              From: {data.hospital}
            </p>
          )}
          {data.urgency && (
            <span className={`badge urgency-${data.urgency}`} style={{ marginTop: 6, fontSize: "0.75rem" }}>
              {data.urgency} urgency
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onAccept} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          ✓ Accept
        </button>
        <button onClick={onDecline} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          ✕ Decline
        </button>
      </div>
    </div>
  );
}

export default Notification;