// // Accept / Reject Request
// const BloodRequest = require("../models/BloodRequest");
// const Donor = require("../models/Donor");

// const respondToRequest = async (req, res) => {
//   try {
//     const { requestId, status } = req.body;

//     const donor = await Donor.findOne({
//       userId: req.user.id
//     });

//     if (!donor) {
//       return res.status(404).json({
//         success: false,
//         message: "Donor profile not found"
//       });
//     }

//     const request =
//       await BloodRequest.findById(requestId);

//     if (!request) {
//       return res.status(404).json({
//         success: false,
//         message: "Request not found"
//       });
//     }

//     // Add response
//     request.responses.push({
//       donorId: donor._id,
//       status,
//       respondedAt: new Date()
//     });

//     await request.save();

//     // SOCKET EVENT
//     const io = req.app.get("io");

//     io.emit("donorResponse", {
//       requestId,
//       donorId: donor._id,
//       status
//     });

//     res.json({
//       success: true,
//       message: `Request ${status}`
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   respondToRequest
// };


// const BloodRequest = require("../models/BloodRequest");
// const Donor = require("../models/Donor");

// const respondToRequest = async (req, res) => {
//   try {
//     const { requestId, status } = req.body;

//     const donor = await Donor.findOne({
//       userId: req.user.id
//     });

//     if (!donor) {
//       return res.status(404).json({
//         success: false,
//         message: "Donor profile not found"
//       });
//     }

//     const request = await BloodRequest.findById(requestId);

//     if (!request) {
//       return res.status(404).json({
//         success: false,
//         message: "Request not found"
//       });
//     }

//     // SAFE INIT
//     if (!request.responses) {
//       request.responses = [];
//     }

//     request.responses.push({
//       donorId: donor._id,
//       status,
//       respondedAt: new Date()
//     });

//     await request.save();

//     // SOCKET
//     const io = req.app.get("io");

//     io.emit("donorResponse", {
//       requestId,
//       donorId: donor._id,
//       status
//     });

//     res.json({
//       success: true,
//       message: `Request ${status}`
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   respondToRequest
// };

const BloodRequest = require("../models/BloodRequest");
const Donor = require("../models/Donor");

const respondToRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const donor = await Donor.findOne({
      userId: req.user.id
    });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found"
      });
    }

    const request = await BloodRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }

    // ensure array exists
    if (!request.responses) {
      request.responses = [];
    }

    request.responses.push({
      donorId: donor._id,
      status,
      respondedAt: new Date()
    });

    await request.save();

    // SOCKET (correct place)
    const io = req.app.get("io");

    io.emit("donorResponse", {
      requestId,
      donorId: donor._id,
      status
    });

    return res.json({
      success: true,
      message: `Request ${status}`
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  respondToRequest
};