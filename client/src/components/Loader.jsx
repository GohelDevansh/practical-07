// function Loader() {
//   return (
//     <p>
//       Loading...
//     </p>
//   );
// }

// export default Loader;

function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-overlay">
      <div className="loader-ring"></div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{text}</p>
    </div>
  );
}

export default Loader;