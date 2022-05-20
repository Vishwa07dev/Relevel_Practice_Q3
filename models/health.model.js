const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        reference: "User",
        required: true,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    identifiedSymptoms: {
        type: String,
        required: true,
    },
    hemoglobin: {
        type: String,
    },
    bloodPressure: {
        type: Number,
    },
    sugarLevel: {
        type: Number,
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

module.exports = mongoose.model("Health", healthSchema);