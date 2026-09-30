// import { io } from "socket.io-client";

// const socket = io(
//   import.meta.env.VITE_SOCKET_URL ||
//   "http://localhost:5000"
// );

// export default socket;


import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  auth: () => ({
    token: localStorage.getItem("token"),
  }),
});

socket.on("connect_error", (err) => {
  console.warn("[Socket] Connection error:", err.message);
});

export default socket;