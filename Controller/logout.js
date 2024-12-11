const express = require("express");
const router = express.Router();
const Token = require("../model/Token.js"); 
const auth = require("../middleware/auth.js");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken")

dotenv.config();

router.post("/logout", auth, async (req, res) => {
  try {
    console.log(req.cookies.refreshToken)
    
    const userId=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);
   
    const logout=await Token.deleteMany({user:userId.id});
    console.log(logout);

    res.setHeader('Set-Cookie',[
        'accessToken=""; path=/; HttpOnly; secure=false; SameSite=None',
        'refreshToken=""; path=/; HttpOnly; secure=false; SameSite=None'
    ])
    res.status(200).json({message:"logout successful"});
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
