const mongoose = require("mongoose");

const Cart=mongoose.Schema({
    
    id:{
        type:Number,
        require:true
    },
    count:{
        type:Number,
    },
    title:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    actualPrice:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
    
});

module.exports=mongoose.model('Carts',Cart)