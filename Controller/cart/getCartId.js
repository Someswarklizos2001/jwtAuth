const express=require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const User = require('../../model/User');
const router=express.Router();
const auth=require("../../middleware/auth");

dotenv.config();

router.get('/getCartId',auth,async(req,res)=>{

    const decode=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);

    try{    
        const cart_ids=await User.findById(decode.id);
        const ids=cart_ids.cartId
        return res.status(200).json({message:"successfully fetched",ids});
        
    }catch(e){
        return res.status(400).json(e.message);
    }

})

module.exports=router;