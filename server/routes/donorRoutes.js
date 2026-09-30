


// const express = require("express");
// const router = express.Router();

// // Middleware
// const { protect } = require("../middleware/authMiddleware");

// // Controllers
// const {
//   createDonor,
//   getMyDonorProfile,
//   updateAvailability,
//   getAllDonors,
//   findNearbyDonors,
// } = require("../controllers/donorController");

// // ==========================
// // CREATE DONOR PROFILE
// // POST /api/donors
// // ==========================
// router.post("/", protect, createDonor);

// // ==========================
// // GET MY PROFILE
// // GET /api/donors/me
// // ==========================
// router.get("/me", protect, getMyDonorProfile);

// // ==========================
// // UPDATE AVAILABILITY
// // PUT /api/donors/availability
// // ==========================
// router.put("/availability", protect, updateAvailability);

// // ==========================
// // GET ALL DONORS
// // GET /api/donors
// // ==========================
// router.get("/", getAllDonors);

// // ==========================
// // FIND NEARBY DONORS
// // POST /api/donors/nearby
// // ==========================
// router.post("/nearby", protect, findNearbyDonors);

// module.exports = router;


// const {
//   createDonor,
//   updateAvailability,
//   getAllDonors,
//   findNearbyDonors,
//   getMyProfile,
// } = require("../controllers/donorController");

// router.get("/me", protect, getMyProfile);


const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createDonor,
  getMyDonorProfile,
  updateAvailability,
  getAllDonors,
  findNearbyDonors,
} = require("../controllers/donorController");

// Create donor profile
router.post("/", protect, createDonor);

// Get logged-in donor profile
router.get("/me", protect, getMyDonorProfile);

// Update availability
router.put("/availability", protect, updateAvailability);

// Get all donors
router.get("/", getAllDonors);

// Find nearby donors
router.post("/nearby", protect, findNearbyDonors);

module.exports = router;