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

    fromTime: {
      type: String,
      required: true,
    },

    toTime: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },

    status : {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const counsellorModel = mongoose.model("Counsellor", counsellorSchema);

module.exports = counsellorModel;
