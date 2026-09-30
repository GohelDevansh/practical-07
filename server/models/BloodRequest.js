


const mongoose = require("mongoose");

// Sub-schema for responses
const responseSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true
    },
    status: {
      type: String,
      enum: ["ACCEPTED", "REJECTED", "PENDING"],
      default: "PENDING"
    },
    respondedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false } // optional: removes extra _id for each response
);

// Main Blood Request schema
const bloodRequestSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    patientName: {
      type: String,
      required: true
    },

    bloodGroup: {
      type: String,
      required: true
    },

    unitsNeeded: {
      type: Number,
      required: true
    },

    // city: {
    //   type: String,
    //   required: true
    // },
    city: {
  type: String,
  required: true
},

    location: {
      latitude: Number,
      longitude: Number
    },

    // urgency: {
    //   type: String,
    //   enum: ["LOW", "MEDIUM", "HIGH"],
    //   default: "MEDIUM"
    // },

    urgency: {
  type: String,
  enum: ["LOW", "MEDIUM", "HIGH"],
  default: "MEDIUM",
  set: (v) => v.toUpperCase()
},

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "COMPLETED"],
      default: "OPEN"
    },

    // ✅ FIXED FIELD
    responses: [responseSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);