const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const jwt=require("jsonwebtoken")

const dotenv=require('dotenv');


dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", auth, async (req, res) => {

  const title=req?.body?.title ;
  const description=req?.body?.description ;
  const image=req?.body?.image;
  const price=req?.body?.price;

  const decode=jwt.verify(req.cookies.refreshToken,process.env.REFRESS_TOKEN_SECRET_KEY);

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
        customer_email:decode.email
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports=router;