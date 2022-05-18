/**
 * This file will hold the schema for the User resource
 */

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
         default : constants.userType.patient,
         enum : [constants.userType.patient, constants.userType.doctor, constants.userType.admin]
     },
     hospitalId : {
         type : [mongoose.SchemaTypes.ObjectId],
         ref : "Hospital"
     },
 
 });
 
 module.exports = mongoose.model("User", userSchema);