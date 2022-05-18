
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
        default : constants.userTypes.patient
    },
    hospital_id: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Hospital"
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

module.exports = mongoose.model("user", userSchema);