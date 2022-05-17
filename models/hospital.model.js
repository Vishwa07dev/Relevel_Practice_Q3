const mongoose = require('mongoose');


const hospitalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true
    },
    // doctor_ids:{
    //     type:[mongoose.SchemaTypes.ObjectId],
    //     ref:"Doctor"
    // },
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

module.exports = mongoose.model("Hospital", hospitalSchema);