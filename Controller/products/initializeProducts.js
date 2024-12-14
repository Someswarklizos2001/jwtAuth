const express=require('express');
const Product = require('../../model/Product');
const dotenv=require('dotenv');
const axios=require('axios');
const router=express.Router();
const auth=require("../../middleware/auth");

dotenv.config();

router.get('/intializeProducts',auth, async (req, res) => {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products');
  
      for (const item of data) {
        try {
          const product = new Product({
            id:item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.image,
            rating: {
              rate: item.rating.rate,
              count: item.rating.count,
            },
          });
          await product.save();
        } catch (error) {
          if (error.code === 11000) {
            // Duplicate key error
            console.log(`Duplicate product skipped: ${item.id}`);
          } else {
            console.error(`Error saving product: ${item.id}`, error);
          }
        }
      }
      res.status(200).json({ message: 'Products fetched and saved successfully!' });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch and save products.' });
    }
  });
  

module.exports=router;