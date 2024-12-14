const express=require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const Cart = require('../../model/Cart');
const router=express.Router();
const auth=require("../../middleware/auth");

dotenv.config();

router.post("/cartincrease",auth, async (req, res) => {
    try {
      
      const decode = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESS_TOKEN_SECRET_KEY
      );
  
      const cartItem = await Cart.findOne({ id: req.body.id, user: decode.id });
  
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
     
      const updateCountOfProduct = await Cart.updateOne(
        { _id: cartItem._id }, 
        {
          $set: {
            count: cartItem.count + 1,
          },
        }
      );
  
      return res.status(200).json({ message: "Successfully updated",cartItem });
    } catch (e) {
      console.error("Error in /cartincrease:", e.message);
      return res.status(400).json({ error: e.message });
    }
  });

module.exports=router;