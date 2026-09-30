

const BloodRequest = require("../models/BloodRequest");
const Donor = require("../models/Donor");
const getDistance = require("../utils/distance");
const sendEmail = require("../utils/mailer");


// CREATE REQUEST
const createRequest = async (req, res) => {
  try {


const {
  patientName,
  bloodGroup,
  unitsNeeded,
  city,
  location,
  urgency
} = req.body;

    // const request = await BloodRequest.create({
    //   hospitalId: req.user.id,
    //   patientName,
    //   bloodGroup,
    //   unitsNeeded,
    //   city,
    //   location,
    //   urgency
    // });
    const request = await BloodRequest.create({
  hospitalId: req.user.id,
  patientName,
  bloodGroup,
  unitsNeeded,
  city,
  location,
  urgency
});

    const donors = await Donor.find({
      bloodGroup,
      availability: true
    });

    const nearbyDonors = donors.filter((donor) => {

      if (
        !donor.location ||
        donor.location.latitude == null ||
        donor.location.longitude == null
      ) {
        return false;
      }

      const distance = getDistance(
        location.latitude,
        location.longitude,
        donor.location.latitude,
        donor.location.longitude
      );

      return distance <= 10;
    });

    const io = req.app.get("io");

    // if (io) {
    //   io.emit("newBloodRequest", {
    //     bloodGroup,
    //     urgency,
    //     location,
    //     donors: nearbyDonors.map(
    //       donor => donor._id
    //     )
    //   });
    // }
      if (io) {
  io.emit("newBloodRequest", {
    requestId: request._id,
    bloodGroup,
    urgency,
    location,
    donors: nearbyDonors.map(
      donor => donor._id
    )
  });
}

    for (const donor of nearbyDonors) {

      if (donor.email) {

        try {

          await sendEmail(
            donor.email,
            "🚨 Emergency Blood Required",
            `Urgent ${bloodGroup} blood needed near you. Please respond quickly.`
          );

        } catch (emailError) {

          console.log(
            "Email Error:",
            emailError.message
          );

        }

      }

    }

    return res.status(201).json({
      success: true,
      request,
      matchedDonors: nearbyDonors,
      count: nearbyDonors.length
    });

  } catch (error) {

    console.error(
      "CREATE REQUEST ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET ALL REQUESTS
const getAllRequests = async (req, res) => {
  try {

    const requests =
      await BloodRequest.find()
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });

  } catch (error) {

    console.error(
      "GET ALL REQUESTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET REQUEST BY ID
const getRequestById = async (req, res) => {
  try {

    const request =
      await BloodRequest.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        success: false,
        message: "Request not found"
      });

    }

    return res.status(200).json({
      success: true,
      request
    });

  } catch (error) {

    console.error(
      "GET REQUEST BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// UPDATE REQUEST STATUS
const updateRequestStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const request =
      await BloodRequest.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    if (!request) {

      return res.status(404).json({
        success: false,
        message: "Request not found"
      });

    }

    return res.status(200).json({
      success: true,
      request
    });

  } catch (error) {

    console.error(
      "UPDATE REQUEST STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus
};