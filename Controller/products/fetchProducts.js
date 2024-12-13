const express = require("express");
const router = express.Router();
const Product = require("../../model/Product"); // Assuming a Product model is defined

// API to fetch paginated products
router.get("/fetchproducts", async (req, res) => {
  try {
    // Get `limit` and `page` from query parameters
    const limit = parseInt(req.query.limit) || 8; // Default limit: 8
    const page = parseInt(req.query.page) || 1; // Default page: 1

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated products from MongoDB
    const products = await Product.find().skip(skip).limit(limit);

    // Total number of products for pagination metadata
    const totalProducts = await Product.countDocuments();

    // Return the paginated data with metadata
    res.status(200).json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
