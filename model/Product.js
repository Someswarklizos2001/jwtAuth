const mongoose = require("mongoose");

const Product=mongoose.Schema({
    
    id:{
        type:Number,
        unique:true,
    },
    count:{
        type:Number,
    },
    title:{
        type:String,
       
    },
    image:{
        type:String,
        
    },
    category:{
        type:String,
       
    },
    actualPrice:{
        type:String,
      
    },
    price:{
        type:String,
      
    },
    description:{
        type:String,
      
    },
    rating: {
        rate: { type: Number},
        count: { type: Number }
    }
    
});

module.exports=mongoose.model('Products',Product)