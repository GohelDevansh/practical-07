

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const responseRoutes = require("./routes/responseRoutes");

// MIDDLEWARE
const { protect } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

// CONNECT DATABASE
connectDB();

// SECURITY
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// MIDDLEWARE
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// DEBUG ROUTES
console.log("authRoutes:", typeof authRoutes);
console.log("donorRoutes:", typeof donorRoutes);
console.log("requestRoutes:", typeof requestRoutes);
console.log("responseRoutes:", typeof responseRoutes);

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/responses", responseRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Blood Donation Network API Running",
  });
});

// PROTECTED TEST ROUTE
app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// 404 HANDLER
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ERROR HANDLER
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// console.log("MONGO_URI =", process.env.MONGO_URI);