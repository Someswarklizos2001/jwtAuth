const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const auth = require("../middleware/auth.js");

router.get("/getUsers", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
