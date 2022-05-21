
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
   
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
        default : constants.types.patient,
    },
    healthTrackRecords: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Health",
    },
    appointments: { 
       type: [mongoose.SchemaTypes.ObjectId],
        ref: "Appointment", 
    },
    patientAppointments: { 
       type: [mongoose.SchemaTypes.ObjectId],
        ref: "Appointment", 
    },
    hospitalIds: {
        type: [mongoose.SchemaTypes.ObjectId],
        reference: "Hospital"
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
        immutable : false,
        default : ()=>{
            return Date.now();
        }
    },
     
});

module.exports = mongoose.model("User", userSchema);