const express=require('express');
const Product=require('../../model/Product');
const router=express.Router();
const auth=require('../../middleware/auth');

router.get("/products/category",auth,async(req,res)=>{

    try{
    const products=await Product.find({
        category:req.query.category,
        id:{$ne:req.query.id}
    })

    res.status(200).json(products);
    }catch(error){
        res.status(400).json(error);
    }
    
})

module.exports=router;