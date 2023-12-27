const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const counsellorModel = require("../models/counsellor_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middleware/authmiddleware");

router.get("/get-all-users", authmiddleware, async (req, res) => {
  
    try {
      const users = await userModel.find({ isAdministrator: false, isCounsellor: false });
      res.status(200).send({
        success: true,
        data: users,
      });
    } catch (err) {
      res.status(500).send({ message: "Error reading data", success: false, err });
    }
  });
  
  router.get("/get-all-counsellors", authmiddleware, async (req, res) => {
    try {
      const counsellors = await counsellorModel.find({});
      res.status(200).send({
        success: true,
        data: counsellors,
      });
    } catch (err) {
      res.status(500).send({ message: "Error reading data", success: false, err });
    }
  });
  
  
  router.get("/get-all-admin", authmiddleware, async (req, res) => {
    try {
      const counsellors = await userModel.find({ isAdministrator: true, isCounsellor: false });
      res.status(200).send({
        success: true,
        data: counsellors,
      });
    } catch (err) {
      res.status(500).send({ message: "Error reading data", success: false, err });
    }
  });

  router.post("/change-counsellor-status", authmiddleware, async (req, res) => {
    try {
      const { id, status , userId} = req.body;
      const counsellor = await counsellorModel.findById(id,{
        status
      });

      res.status(200).send({
        message: "Status changed successfully",
        success: true,
        data: counsellor,
      });

      const user = await userModel.findOne({_id: userId});

      const unseenNotificatin = user.unreadNotifications;

      unseenNotificatin.push({
        type: "New counsellor application approved",
        message: `Your application to be a counsellor has been ${status}`,
        onclick: "/notification",
      });
  
      await userModel.findByIdAndUpdate(user._id, {
        unseenNotificatin,
      });
  
      user.save();

      res.status(200).send({
        message: "Status changed successfully",
        success: true,
        data: counsellor,
      });

    } catch (err) {
      res.status(500).send({ message: "Error reading data", success: false, err });
    }
  });

  module.exports = router;