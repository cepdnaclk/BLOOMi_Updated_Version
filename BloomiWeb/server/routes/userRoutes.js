const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const counsellorModel = require("../models/counsellor_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(200)
        .json({ message: "Email already exists", success: false });
    } else {
      const password = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      res
        .status(200)
        .send({ message: "User registered successfully", success: true });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error creating user", success: false, err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User doesn't exists", success: false });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(200)
          .json({ message: "Incorrect Password", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h", // Remove the extra space here
        });

        return res
          .status(200)
          .send({ message: "Login Succesfully", success: true, data: token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Error Login user", success: false, err });
  }
});

router.post("/get-user-info-by-id", authmiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.password = undefined;

    if (!user) {
      return res.status(200).send({
        message: "User doesn't exists",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error Login user",
      success: false,
      error,
    });
  }
});

router.post("/apply-counsellor-account", authmiddleware, async (req, res) => {
  try {
    const newCounsellor = new counsellorModel({
      ...req.body,
      status: "pending",
    });

    await newCounsellor.save();

    const adminUser = await userModel.findOne({
      isAdministrator: true,
    });

    const unseenNotificatin = adminUser.unreadNotifications;

    unseenNotificatin.push({
      type: "New counsellor application",
      message: `${newCounsellor.firstName} ${newCounsellor.lastName} has applied to be a counsellor`,
      data: {
        counsellorId: newCounsellor._id,
        counsellorName: `${newCounsellor.firstName}  " " ${newCounsellor.lastName}`,
      },

      onclick: "/admin/counsellor-application",
    });

    await userModel.findByIdAndUpdate(adminUser._id, {
      unseenNotificatin,
    });

    adminUser.save();

    res
      .status(200)
      .send({ message: "Application submitted successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error submiting form", success: false, err });
  }
});

module.exports = router;
