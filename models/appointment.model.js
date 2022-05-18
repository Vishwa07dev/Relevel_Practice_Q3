/**
 * this file will contain the appointment resources atributes
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");

 const appointmentSchema = new mongoose.Schema({ 
           /**
            *  appointmentId, docId, patientId, timing, createdAt, updatedAt 
            */       
    docId : {
        type : String,
        required : true 
    },
    patientId : {
        type : String,
        required : true
    },
    hospitalId : {
        type : String,
        required : true
    },
    timing :{
        type : String,// Date
        required : true
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
 
module.exports = mongoose.model("Appointment", appointmentSchema)
