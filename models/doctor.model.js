/**
 * This file will hold the schema for the Doctor resource
 */

 const mongoose = require("mongoose");
 const constants = require("../utils/constants");

 const doctorSchema = new mongoose.Schema({
    
    /**
     *  name, qualification, patients, doc_id
     */

     name : {
        type : String,
        required : true
     },
    qualification :{
        type : String,
        required : true
    },
    appointments:{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "User"
    },
    docId : {
        type : String,
         required : true
    },
    timing : {
        type : String,
        required : true
    }

  })

 module.exports = mongoose.model("Doctor", doctorSchema);
