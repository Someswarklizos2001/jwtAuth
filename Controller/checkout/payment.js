const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const stripe = require("stripe")("sk_test_51QWXfvLb3aUo71xgGkOvNCGWeIC1y5tdXicxE25xn6WFBRFW5RjXywjaFrBFbXmm8p5zQ1UB63SZxNV4Bkc4GO1K00XtLRWBfm");
const dotenv=require('dotenv');


dotenv.config();

router.post("/create-checkout-session", auth, async (req, res) => {

  const {title,description,image,price}=req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { 
                  name: title,
                  images:[image],
                  description:description
                  
               },
              unit_amount: price*100,
              
            },
            quantity: 1,
            
          },
        ],
        mode: "payment",
        success_url: `${process.env.REACT_BASEURL}/success`,
        cancel_url: `${process.env.REACT_BASEURL}/cancel`,
        
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating session:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports=router;