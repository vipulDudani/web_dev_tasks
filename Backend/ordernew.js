const mongoose = require("mongoose");

const order = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },  
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    } 
})

const Order = new mongoose.model("ordernew", order);
module.exports = Order; 