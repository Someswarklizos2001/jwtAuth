const express=require('express');
const Cart = require('../../model/Cart');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const User = require('../../model/User');
const router=express.Router();

dotenv.config();

router.post('/addtocart',async(req,res)=>{

    const {id,count,title,image,category,actualPrice,price,description}=req.body;
    const decode=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);

    try{    

        const cart=new Cart({
            id:id,
            count:count,
            title:title,
            image:image,
            category:category,
            actualPrice:actualPrice,
            price:price,
            description:description,
            user:decode.id,
        })

        const cart_id_add = await User.updateOne(
            { _id: decode.id },
            { $push: { cartId: id } } 
        );
        
        const newCartResponse=await cart.save();
        return res.status(200).json({message:"successfully fetched",newCartResponse,cart_id_add});
        
    }catch(e){
        return res.status(400).json(e.message);
    }

})

module.exports=router;