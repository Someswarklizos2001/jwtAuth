const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Cart = require("../../model/Cart");
const User = require("../../model/User");
const router = express.Router();

dotenv.config();

router.post("/cartdecrease", async (req, res) => {
    try {
      // Decode user from JWT token

      console.log(req.body);
      
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
  
      if (cartItem.count <= 1) {
        // Remove the item from the cart
        await Cart.deleteOne({ _id: cartItem._id });
  
        // Remove the item's ID from the user's cartId array
        await User.updateOne(
          { _id: decode.id }, // Find user by decoded ID
          { $pull: { cartId: String(req.body.id) } } // Remove the item ID from cartId array
        );
  
        return res.status(200).json({ message: "Item removed from cart and cartId updated" });
      } else {
        // Decrease the count of the item in the cart
        await Cart.updateOne(
          { _id: cartItem._id }, // Find by cart item's ID
          {
            $set: {
              count: cartItem.count - 1, // Decrement count by 1
            },
          }
        );
  
        return res.status(200).json({ message: "Successfully updated" });
      }
    } catch (e) {
      console.error("Error in /cartdecrease:", e.message);
      return res.status(400).json({ error: e.message });
    }
  });
  
  module.exports

module.exports = router;
