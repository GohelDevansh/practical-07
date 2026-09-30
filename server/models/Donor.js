const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bloodGroup: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    location: {
      latitude: Number,
      longitude: Number
    },

    availability: {
      type: Boolean,
      default: true
    },

    lastDonationDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Donor",
  donorSchema
);