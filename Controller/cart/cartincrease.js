const express=require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const Cart = require('../../model/Cart');
const router=express.Router();

dotenv.config();

router.post("/cartincrease", async (req, res) => {
    try {
      // Decode user from JWT token
      const decode = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESS_TOKEN_SECRET_KEY
      );
  
      // Find the cart item for the user and product
      const cartItem = await Cart.findOne({ id: req.body.id, user: decode.id });
  
      // If the cart item doesn't exist, return an error
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      // Update the count of the product in the cart
      const updateCountOfProduct = await Cart.updateOne(
        { _id: cartItem._id }, // Find by cart item's ID
        {
          $set: {
            count: cartItem.count + 1, // Increment count by 1
          },
        }
      );
  
      return res.status(200).json({ message: "Successfully updated" });
    } catch (e) {
      console.error("Error in /cartincrease:", e.message);
      return res.status(400).json({ error: e.message });
    }
  });

module.exports=router;