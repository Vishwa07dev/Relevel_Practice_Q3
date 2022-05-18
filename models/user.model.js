const mongoose = require("mongoose");
const constants = require("..utils/constants")

const userSchema = new mongoose.Schema({

    // name, userId, passwor, createdAt, updatedAt, usertype[PATIENT,DOCTOR,ADMIN], status- [APPROVED]

name : {
    type : String,
    required : true
},
userId : {
    type : String,
    required : true,
    unique : true
},
password : {
    type : String,
    required : true
},
address : {
    type : String,
    required : true
}, 
createdAt : {
    type : Date,
    immutable : true,
    default : ()=>{
        return Date.now();
    },
},
updatedAt : {
    type : Date,
    default : () => {
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
    type : [mongoose.SchemaType.objectID],
    ref : "Hospital"
}, 
})
mongoose.exports = mongoose("User", userSchema);