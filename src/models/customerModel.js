const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "firstname required"
    },
    lastName: {
        type: String,
        required: "lastname required"
    },
    mobile: {
        type: String,
        required:"phone no.is required",
        unique: true,
        
    },
    DOB: {
        type: Date
    },
    email: {
        type: String,
        unique: true,
       
        },
        address: {
            type: String
        },
        status: {
            type: String,
           
        },
        isDeleted:{
            type:Boolean,
            default:false
        }

    
    },{timestamps:true})

    module.exports=mongoose.model('customer',customerSchema)
