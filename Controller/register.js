const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const { encryption } = require("node-data-cryption");

router.post("/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  const encrypted_password = encryption(password, 16);
  const encrypted_confirm_password = encryption(confirmpassword, 16);
  console.log(encrypted_password,encrypted_confirm_password);

  try {
    const newUser = new User({
      name,
      email,
      password:encrypted_password,
      confirmpassword:encrypted_confirm_password,
    });
    const response = await newUser.save();
    return res
      .status(200)
      .json({ message: "registration successful!!", response });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
