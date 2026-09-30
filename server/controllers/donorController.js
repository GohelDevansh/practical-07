// // const Donor = require("../models/Donor");
// // const getDistance = require("../utils/distance");


// // // 3.1 CREATE DONOR PROFILE
// // const createDonor = async (req, res) => {
// //   try {
// //     const donor = await Donor.create({
// //       userId: req.user.id,
// //       bloodGroup: req.body.bloodGroup,
// //       phone: req.body.phone,
// //       city: req.body.city,
// //       location: req.body.location
// //     });

// //     res.status(201).json({
// //       success: true,
// //       donor
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };


// // // 3.2 UPDATE AVAILABILITY
// // const updateAvailability = async (req, res) => {
// //   try {
// //     const donor = await Donor.findOneAndUpdate(
// //       { userId: req.user.id },
// //       { availability: req.body.availability },
// //       { new: true }
// //     );

// //     res.json({
// //       success: true,
// //       donor
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };


// // // 3.3 GET ALL DONORS
// // const getAllDonors = async (req, res) => {
// //   try {
// //     const donors = await Donor.find();

// //     res.json({
// //       success: true,
// //       count: donors.length,
// //       donors
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };


// // // 3.4 NEARBY DONOR MATCHING (MAIN FEATURE)
// // const findNearbyDonors = async (req, res) => {
// //   try {
// //     const {
// //       bloodGroup,
// //       latitude,
// //       longitude,
// //       radius = 10
// //     } = req.body;

// //     const donors = await Donor.find({
// //       bloodGroup,
// //       availability: true
// //     });

// //     const nearbyDonors = donors.filter((donor) => {
// //       if (!donor.location?.latitude) return false;

// //       const distance = getDistance(
// //         latitude,
// //         longitude,
// //         donor.location.latitude,
// //         donor.location.longitude
// //       );

// //       return distance <= radius;
// //     });

// //     res.json({
// //       success: true,
// //       count: nearbyDonors.length,
// //       donors: nearbyDonors
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };


// // // EXPORT
// // module.exports = {
// //   createDonor,
// //   updateAvailability,
// //   getAllDonors,
// //   findNearbyDonors
// // };



// // const Donor = require("../models/Donor");

// // // Safe import (prevent crash if file missing)
// // let getDistance;
// // try {
// //   getDistance = require("../utils/distance");
// // } catch (err) {
// //   console.warn("⚠️ distance.js not found, using fallback distance function");

// //   // fallback Haversine formula
// //   getDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371;
// //     const dLat = (lat2 - lat1) * Math.PI / 180;
// //     const dLon = (lon2 - lon1) * Math.PI / 180;

// //     const a =
// //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //       Math.cos(lat1 * Math.PI / 180) *
// //       Math.cos(lat2 * Math.PI / 180) *
// //       Math.sin(dLon / 2) *
// //       Math.sin(dLon / 2);

// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// //     return R * c;
// //   };
// // }

// // // ==========================
// // // CREATE DONOR PROFILE
// // // ==========================
// // const createDonor = async (req, res) => {
// //   try {
// //     const donor = await Donor.create({
// //       userId: req.user.id,
// //       bloodGroup: req.body.bloodGroup,
// //       phone: req.body.phone,
// //       city: req.body.city,
// //       location: req.body.location
// //     });

// //     res.status(201).json({
// //       success: true,
// //       donor
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };

// // // ==========================
// // // UPDATE AVAILABILITY
// // // ==========================
// // const updateAvailability = async (req, res) => {
// //   try {
// //     const donor = await Donor.findOneAndUpdate(
// //       { userId: req.user.id },
// //       { availability: req.body.availability },
// //       { new: true }
// //     );

// //     res.json({
// //       success: true,
// //       donor
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };

// // // ==========================
// // // GET ALL DONORS
// // // ==========================
// // const getAllDonors = async (req, res) => {
// //   try {
// //     const donors = await Donor.find();

// //     res.json({
// //       success: true,
// //       count: donors.length,
// //       donors
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };

// // // ==========================
// // // FIND NEARBY DONORS
// // // ==========================
// // const findNearbyDonors = async (req, res) => {
// //   try {
// //     const { bloodGroup, latitude, longitude, radius = 10 } = req.body;

// //     if (!bloodGroup || !latitude || !longitude) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "bloodGroup, latitude, longitude required"
// //       });
// //     }

// //     const donors = await Donor.find({
// //       bloodGroup,
// //       availability: true
// //     });

// //     const nearbyDonors = donors.filter((donor) => {
// //       if (
// //         !donor.location ||
// //         donor.location.latitude == null ||
// //         donor.location.longitude == null
// //       ) {
// //         return false;
// //       }

// //       const distance = getDistance(
// //         latitude,
// //         longitude,
// //         donor.location.latitude,
// //         donor.location.longitude
// //       );

// //       return distance <= radius;
// //     });

// //     res.json({
// //       success: true,
// //       count: nearbyDonors.length,
// //       donors: nearbyDonors
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };

// // // ==========================
// // // EXPORTS
// // // ==========================
// // // module.exports = {
// // //   createDonor,
// // //   updateAvailability,
// // //   getAllDonors,
// // //   findNearbyDonors
// // // };

// // module.exports = {
// //   createDonor,
// //   updateAvailability,
// //   getAllDonors,
// //   findNearbyDonors,
// //   getMyDonorProfile
// // };


// // const getDonorScore = require("../utils/donorScore");

// // const rankedDonors = nearbyDonors
// //   .map((donor) => ({
// //     donor,
// //     score: getDonorScore(donor)
// //   }))
// //   .sort((a, b) => b.score - a.score);

// //   const getMyDonorProfile = async (req, res) => {
// //   try {
// //     const donor = await Donor.findOne({
// //       userId: req.user.id
// //     });

// //     if (!donor) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Donor profile not found"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       donor
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // };


// const Donor = require("../models/Donor");

// // Safe import (prevent crash if file missing)
// let getDistance;
// try {
//   getDistance = require("../utils/distance");
// } catch (err) {
//   console.warn("⚠️ distance.js not found, using fallback distance function");

//   // fallback Haversine formula
//   getDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;

//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };
// };

// // ==========================
// // CREATE DONOR PROFILE
// // ==========================
// const createDonor = async (req, res) => {
//   try {
//     const donor = await Donor.create({
//       userId: req.user.id,
//       bloodGroup: req.body.bloodGroup,
//       phone: req.body.phone,
//       city: req.body.city,
//       location: req.body.location,
//     });

//     res.status(201).json({
//       success: true,
//       donor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================
// // GET MY DONOR PROFILE
// // ==========================
// const getMyDonorProfile = async (req, res) => {
//   try {
//     const donor = await Donor.findOne({
//       userId: req.user.id,
//     });

//     if (!donor) {
//       return res.status(404).json({
//         success: false,
//         message: "Donor profile not found",
//       });
//     }

//     res.json({
//       success: true,
//       donor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================
// // UPDATE AVAILABILITY
// // ==========================
// const updateAvailability = async (req, res) => {
//   try {
//     const donor = await Donor.findOneAndUpdate(
//       { userId: req.user.id },
//       { availability: req.body.availability },
//       { new: true }
//     );

//     if (!donor) {
//       return res.status(404).json({
//         success: false,
//         message: "Donor profile not found",
//       });
//     }

//     res.json({
//       success: true,
//       donor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================
// // GET ALL DONORS
// // ==========================
// const getAllDonors = async (req, res) => {
//   try {
//     const donors = await Donor.find();

//     res.json({
//       success: true,
//       count: donors.length,
//       donors,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================
// // FIND NEARBY DONORS
// // ==========================
// const findNearbyDonors = async (req, res) => {
//   try {
//     const {
//       bloodGroup,
//       latitude,
//       longitude,
//       radius = 10,
//     } = req.body;

//     if (!bloodGroup || !latitude || !longitude) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "bloodGroup, latitude and longitude are required",
//       });
//     }

//     const donors = await Donor.find({
//       bloodGroup,
//       availability: true,
//     });

//     const nearbyDonors = donors.filter((donor) => {
//       if (
//         !donor.location ||
//         donor.location.latitude == null ||
//         donor.location.longitude == null
//       ) {
//         return false;
//       }

//       const distance = getDistance(
//         latitude,
//         longitude,
//         donor.location.latitude,
//         donor.location.longitude
//       );

//       return distance <= radius;
//     });

//     res.json({
//       success: true,
//       count: nearbyDonors.length,
//       donors: nearbyDonors,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // module.exports = {
// //   createDonor,
// //   getMyDonorProfile,
// //   updateAvailability,
// //   getAllDonors,
// //   findNearbyDonors,
// // };

// const getMyProfile = async (req, res) => {
//   try {
//     const donor = await Donor.findOne({
//       userId: req.user.id,
//     });

//     if (!donor) {
//       return res.status(404).json({
//         success: false,
//         message: "Donor profile not found",
//       });
//     }

//     res.json({
//       success: true,
//       donor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // module.exports = {
// //   createDonor,
// //   updateAvailability,
// //   getAllDonors,
// //   findNearbyDonors,
// //   getMyProfile,
// // };

// module.exports = {
//   createDonor,
//   getMyDonorProfile,
//   updateAvailability,
//   getAllDonors,
//   findNearbyDonors,
// };


const Donor = require("../models/Donor");

// Safe import (prevent crash if file missing)
let getDistance;

try {
  getDistance = require("../utils/distance");
} catch (err) {
  console.warn(
    "⚠️ distance.js not found, using fallback distance function"
  );

  // Fallback Haversine formula
  getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };
};

// ==========================
// CREATE DONOR PROFILE
// ==========================

// console.log("Logged User:", req.user.id);

// const existingDonor = await Donor.findOne({
//   userId: req.user.id,
// });

// console.log("Existing Donor:", existingDonor);

// const createDonor = async (req, res) => {
//   try {
//     const existingDonor = await Donor.findOne({
//       userId: req.user.id,
//     });

//     if (existingDonor) {
//       return res.status(400).json({
//         success: false,
//         message: "Donor profile already exists",
//       });
//     }

//     const donor = await Donor.create({
//       userId: req.user.id,
//       bloodGroup: req.body.bloodGroup,
//       phone: req.body.phone,
//       city: req.body.city,
//       availability:
//         req.body.availability ?? true,
//       location: req.body.location,
//     });

//     res.status(201).json({
//       success: true,
//       donor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const createDonor = async (req, res) => {
  try {
    console.log("Logged User:", req.user.id);

    const existingDonor = await Donor.findOne({
      userId: req.user.id,
    });

    console.log("Existing Donor:", existingDonor);

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "Donor profile already exists",
      });
    }

    const donor = await Donor.create({
      userId: req.user.id,
      bloodGroup: req.body.bloodGroup,
      phone: req.body.phone,
      city: req.body.city,
      availability: req.body.availability ?? true,
      location: req.body.location,
    });

    res.status(201).json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// GET MY DONOR PROFILE
// ==========================
const getMyDonorProfile = async (
  req,
  res
) => {
  try {
    const donor = await Donor.findOne({
      userId: req.user.id,
    });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found",
      });
    }

    res.json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE AVAILABILITY
// ==========================
const updateAvailability = async (
  req,
  res
) => {
  try {
    const donor =
      await Donor.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        {
          availability:
            req.body.availability,
        },
        {
          new: true,
        }
      );

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found",
      });
    }

    res.json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL DONORS
// ==========================
const getAllDonors = async (
  req,
  res
) => {
  try {
    const donors = await Donor.find();

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// FIND NEARBY DONORS
// ==========================
const findNearbyDonors = async (
  req,
  res
) => {
  try {
    const {
      bloodGroup,
      latitude,
      longitude,
      radius = 10,
    } = req.body;

    if (
      !bloodGroup ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "bloodGroup, latitude and longitude are required",
      });
    }

    const donors = await Donor.find({
      bloodGroup,
      availability: true,
    });

    const nearbyDonors =
      donors.filter((donor) => {
        if (
          !donor.location ||
          donor.location.latitude ==
            null ||
          donor.location.longitude ==
            null
        ) {
          return false;
        }

        const distance =
          getDistance(
            latitude,
            longitude,
            donor.location.latitude,
            donor.location.longitude
          );

        return distance <= radius;
      });

    res.json({
      success: true,
      count: nearbyDonors.length,
      donors: nearbyDonors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// EXPORTS
// ==========================
module.exports = {
  createDonor,
  getMyDonorProfile,
  updateAvailability,
  getAllDonors,
  findNearbyDonors,
};