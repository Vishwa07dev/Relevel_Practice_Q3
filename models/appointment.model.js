
const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    
    userId :{
        type : String,
        required : true,
    },
    docotrId : {
        type : String,
        required: true
    },
    date :{
        type : Date,
        required: true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    },
});

module.exports = mongoose.model("Appointments", appointmentSchema);
