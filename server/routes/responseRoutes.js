// const express = require("express");

// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   respondToRequest
// } = require("../controllers/responseController");

// router.post(
//   "/respond",
//   protect,
//   respondToRequest
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

// const {
//   respondToRequest
// } = require("../controllers/responseController");

// router.post("/respond", protect, respondToRequest);

// module.exports = router;


    // const express = require("express");
    // const router = express.Router();

    // const { protect } = require("../middleware/authMiddleware");
    // const { respondToRequest } = require("../controllers/responseController");

    // router.post("/respond", protect, respondToRequest);

    // module.exports = router;


    const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { respondToRequest } = require("../controllers/responseController");

console.log("respondToRequest:", respondToRequest);

router.post("/respond", protect, respondToRequest);

module.exports = router;