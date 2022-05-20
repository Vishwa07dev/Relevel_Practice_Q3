// This file will hold the schema for User resource

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
 
    /**
     * name, userId, password, address, createdAt , updatedAt, etc.
     * userType [ PATIENT | DOCTOR | ADMIN], 
     * 
     */
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
        type : String
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
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.patient,
         enum : [constants.userTypes.patient, constants.userTypes.doctor, constants.userTypes.admin]
        
    },
    hospitalId : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref: "Hospital"
    },
    healthTrackRecord:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Health"
    },
    appointment: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Appointment"
    }

});

module.exports = mongoose.model("User", userSchema);