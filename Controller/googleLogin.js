const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const Token = require("../model/Token.js");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');

dotenv.config();

router.post("/google-login", async (req, res) => {
  const { email } = req.body;
  
  console.log(email);

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {

        const accesstoken=jwt.sign({id:user._id,email:email,name:user.name},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'15m'});
        const refreshtoken=jwt.sign({id:user._id,email:email,name:user.name},process.env.REFRESS_TOKEN_SECRET_KEY,{expiresIn:'1d'});

        const newToken=new Token({
            refreshtoken:refreshtoken,
            user:user._id
        })

        const refreshTokenResponse=await newToken.save();

        res.setHeader('Set-Cookie', [
            `accessToken=${accesstoken}; Path=/; Secure=false; SameSite=None`,
            `refreshToken=${refreshtoken}; Path=/; Secure=false; SameSite=None`
        ]);

        res.json({message:"login successful",refreshTokenResponse})
    }
});

module.exports = router;
