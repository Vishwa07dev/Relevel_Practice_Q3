
const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    
    userId :{
        type :[mongoose.SchemaTypes.ObjectId],
        ref :"User"
    },
    docotrId : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "User"
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
