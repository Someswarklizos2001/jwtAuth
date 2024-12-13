const express = require("express");
const router = express.Router();
const Product = require("../../model/Product"); 

router.get("/fetchProducts", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;  
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const skip = (page - 1) * limit; 
    
    const filter = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
   
    const totalProducts = await Product.countDocuments(filter);

    if (totalProducts === 0) {
      return res.status(200).json({
        products: [],
        currentPage: 0,
        totalPages: 0,
      });
    }

    const products = await Product.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    }); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});



module.exports = router;
