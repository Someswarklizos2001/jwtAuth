const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const auth = require("../middleware/auth.js");

router.get("/authCheck", auth, async (req, res) => {
  try {
    res.status(200).json({message:"User Authentication completed successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
