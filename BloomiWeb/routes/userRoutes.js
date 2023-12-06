const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model"); 
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {

    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
        return res.status(200).json({ msg: "Email already exists" });
    }else{

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password !== confirmPassword) {
             return res.status(400).json({ message: "Passwords do not match" ,success : false});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new userModel(req.body);  
            await newUser.save();
            res.status(200).send({ message: "User registered successfully", success : true});
        }

    }
     
    
  } catch (err) {
    res.status(500).send({ message: "Error creating user", success : false,err});
  }
});

router.post("/login", async (req, res) => {
  try {
  } catch (err) { }
});

module.exports = router;
