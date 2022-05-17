const constants = require("../utils/constant")
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    /**
     * name, address, , createdAt , updatedAt
     */
    name : {
        type : String,
        required : true
    },
    userId :{
        type :String,
        required : true
    },
    password :{
        type : String,
        required : true

    },
    address : {
        type : String,
        required : true
    },
    hospital_id :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref :"Hospital"
    },
    userType :{
        type : String,
        default : constants.userType.patient,
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

module.exports = mongoose.model("User", userSchema);
