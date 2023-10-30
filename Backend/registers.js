const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    // firstname:{
    //     type:String,
    //     required:true
    // },
    // lastname:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    // phone:{
    //     type:Number,
    //     required:true,
    //     unique:true
    // },
    password:{
        type:String,
        required:true
    },
    // degree:{
    //     type:String,
    //     required:true
    // } 
})

const Registration = new mongoose.model("Registration", DoctorSchema);
module.exports = Registration; 