const express=require('express');
const Product = require('../../model/Product');
const dotenv=require('dotenv');
const axios=require('axios');
const router=express.Router();
const auth=require("../../middleware/auth");

dotenv.config();

router.post('/searchproducts',auth, async (req, res) => {
    try {
        const {input}=req.body;
    
        const search = await Product.find({
            title: {
              $regex: input,
              $options: "i", 
            },
          });
        
        res.status(200).json({message:"fetched succesfully",search});

    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch and save products.' });
    }
  });
  

module.exports=router;