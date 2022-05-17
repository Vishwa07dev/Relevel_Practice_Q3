const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        default: "PATIENT"      // PATIENT/DOCTOR
    },
    hospital_id:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref: "Hospital"
    },
    createdAt:{
        type: Date,
        default:()=>{
            return Date.now();
        }
    },
    updtatedAt:{
        type: Date,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports = mongoose.model("User", userSchema);