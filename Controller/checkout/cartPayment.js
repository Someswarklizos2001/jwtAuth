const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const jwt=require("jsonwebtoken");

const dotenv=require('dotenv');


dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-cart-checkout-session", auth, async (req, res) => {

   const {cart}=req.body;
   const decode=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);

   console.log('segseg');
 
   const line_items=cart.map(data=>({
    price_data: {
      currency: "usd",
      product_data: { 
          name:data.title,
          description:data.description,
          images:[data.image]
       },
       unit_amount: data.price*100,
    },
    quantity: 1,
    
   })
   )

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:line_items,
        mode: "payment",
        success_url: `${process.env.REACT_BASEURL}/success`,
        cancel_url: `${process.env.REACT_BASEURL}/cancel`,
        customer_email:decode.email,
     
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating session:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports=router;