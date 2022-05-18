/**
 * This file will hold the schema for the User resource
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");

 const userSchema = new mongoose.Schema({
 
     /**
      * name, userId, password, email, createdAt , updatedAt
      * userType [ ADMIN | ENGINEER | CUSTOMER ] , 
      * userStatus [ Pending | Approved | Rejected ]
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
         default : constants.userType.patient,
         enum : [constants.userType.patient, constants.userType.doctor, constants.userType.admin]
     },
     hospitalId : {
         type : [mongoose.SchemaTypes.ObjectId],
         ref : "Hospital"
     },
     healthTrackRecords: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "HealthTrackRecord"
     },
     appointments :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Appointment"
     }
 
 });
 
 module.exports = mongoose.model("User", userSchema);