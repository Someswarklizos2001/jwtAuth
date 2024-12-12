const mongoose  = require("mongoose");

const user=mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:Array,
        require:true
    },
    confirmpassword:{
        type:Array,
        require:true
    },
    cartId:{
        type:Array
    }
})

module.exports=mongoose.model('Users',user);