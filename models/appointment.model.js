/**
 * This file will hold the schema for the Appointment record 
 */
const constants = require('../utils/constants')
const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    /**
     *  hospitalId,doctorId,symptons,medications
     *  appointmentStatus[accepted/declined/inprogress (State before the doctor accept or decline the appointment) ]
     */
    userId :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Users",
        required : true
    },
    docotrId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Users",
        required : true
    },
    hospitalId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Hospitals",
        required : true
    },
    symptons :{
        type : [String],
        required : true
    },
    medications :{
        type : [String],
        required : true
    },
    Status :{
        type : String,
        default : constants.appointmentStatus.inprogress,
        enum : [constants.appointmentStatus.accepted,constants.appointmentStatus.declined,constants.appointmentStatus.inprogress]
    },
    date : {
        type : String,
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

module.exports = mongoose.model("Appointments", appointmentSchema);
