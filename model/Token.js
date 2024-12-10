const mongoose = require("mongoose");

const token=mongoose.Schema({
    refreshtoken:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
});

module.exports=mongoose.model('Tokens',token)