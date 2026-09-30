


// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   createRequest,
//   getAllRequests,
//   getRequestById,
//   updateRequestStatus
// } = require("../controllers/requestController");

// // Create Blood Request
// router.post(
//   "/",
//   protect,
//   createRequest
// );

// // Get All Blood Requests
// router.get(
//   "/",
//   getAllRequests
// );

// // Get Single Blood Request By ID
// router.get(
//   "/:id",
//   protect,
//   getRequestById
// );

// // Update Blood Request Status
// router.put(
//   "/:id",
//   protect,
//   updateRequestStatus
// );

// module.exports = router;
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus
} = require("../controllers/requestController");

// Create Blood Request
router.post(
  "/",
  protect,
  createRequest
);

// Request History
router.get(
  "/history",
  protect,
  getAllRequests
);

// Get All Blood Requests
router.get(
  "/",
  getAllRequests
);

// Get Single Blood Request By ID
router.get(
  "/:id",
  protect,
  getRequestById
);

// Update Blood Request Status
router.put(
  "/:id",
  protect,
  updateRequestStatus
);

module.exports = router;