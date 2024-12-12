const express=require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const Cart = require('../../model/Cart');
const router=express.Router();

dotenv.config();

router.get('/getUserCart',async(req,res)=>{

    const decode=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);

    try{    
        const cart_items=await Cart.find({user:decode.id});
        console.log(cart_items);
        return res.status(200).json({message:"successfully fetched",cart_items});

        
    }catch(e){
        return res.status(400).json(e.message);
    }

})

module.exports=router;