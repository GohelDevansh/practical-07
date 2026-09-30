// const express = require("express");

// const router = express.Router();

// const {
//   protect
// } = require("../middleware/authMiddleware");

// const {
//   createRequest,
//   getAllRequests,
//   updateRequestStatus
// } = require(
//   "../controllers/requestController"
// );

// // Create blood request (Hospital only)
// router.post(
//   "/",
//   protect,
//   createRequest
// );

// // Get all requests
// router.get(
//   "/",
//   getAllRequests
// );

// // Update status
// router.put(
//   "/:id",
//   protect,
//   updateRequestStatus
// );

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   createRequest,
//   getAllRequests,
//   updateRequestStatus
// } = require("../controllers/requestController");

// router.post("/", protect, createRequest);
// router.get("/", protect, getAllRequests);
// router.put("/:id", protect, updateRequestStatus);

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   createRequest,
//   getAllRequests,
//   updateRequestStatus
// } = require("../controllers/requestController");

// // CREATE REQUEST
// router.post("/", protect, createRequest);

// // GET ALL REQUESTS
// router.get("/", protect, getAllRequests);

// // UPDATE REQUEST STATUS
// router.put("/:id", protect, updateRequestStatus);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   register,
//   login
// } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;