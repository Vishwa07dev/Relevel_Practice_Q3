const constants = require("../utils/constant")
const mongoose = require("mongoose");


const hospitalSchema = new mongoose.Schema({

    /**
     * name, address, verified, createdAt , updatedAt
     */
    name : {
        type : String,
        required : true
    },
    userId :{
        type :String,
        required : true,
    },
    password :{
        type : String,
        required : true,
        
    },
    address : {
        type : String,
        required : true
    },
    hospital_id :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref :"Hospital"
    },
    type :{
        required : true,
        default : constants.usertype.patient
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

module.exports = mongoose.model("Hospital", hospitalSchema);
