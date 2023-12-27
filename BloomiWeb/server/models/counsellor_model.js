const mongoose = require("mongoose");

const counsellorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    availableDates: {
      type: Array,
      default: [],
    },

    fromTime: {
      type: String,
      required: true,
    },

    toTime: {
      type: String,
      required: true,
    },

    profesion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const counsellorModel = mongoose.model("Counsellor", counsellorSchema);

module.exports = counsellorModel;
