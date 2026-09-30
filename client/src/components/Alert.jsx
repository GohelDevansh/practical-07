// function Alert({
//   message,
//   type
// }) {

//   if (!message) return null;

//   return (
//     <div
//       className={`alert ${type}`}
//     >
//       {message}
//     </div>
//   );
// }

// export default Alert;


// Alert.jsx
export function Alert({ type = "error", message, onClose }) {
  if (!message) return null;
  const icons = { error: "⚠", success: "✓", info: "ℹ", warning: "⚡" };
  return (
    <div className={`alert alert-${type}`} role="alert">
      <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{icons[type]}</span>
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.6, fontSize: "1rem", padding: 0 }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
export default Alert;