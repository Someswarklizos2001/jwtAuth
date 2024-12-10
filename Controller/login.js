const express = require("express");
const app= express();
const router = express.Router();
const User = require("../model/User.js");
const Token = require("../model/Token.js");
const { is_match } = require("node-data-cryption");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');

dotenv.config();



router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    const match_password = is_match(
      password,
      user.password[1],
      user.password[0]
    );

    console.log(password,user.password[1],user.password[0]);
    
    console.log(match_password);

    if (match_password) {

        const accesstoken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'20s'});
        const refreshtoken=jwt.sign({id:user._id},process.env.REFRESS_TOKEN_SECRET_KEY,{expiresIn:'15m'});


        const newToken=new Token({
            refreshtoken:refreshtoken,
            id:user._id
        })

        const refreshTokenResponse=await newToken.save();

        res.setHeader('Set-Cookie', [
            `accessToken=${accesstoken}; Path=/; Secure=false; SameSite=None`,
            `refreshToken=${refreshtoken}; Path=/; Secure=false; SameSite=None`
        ]);

        res.json({message:"login successful",refreshTokenResponse})
    }else{
        res.status(500).json({message:"incorrect credentials"})
    }
  }
});

module.exports = router;
