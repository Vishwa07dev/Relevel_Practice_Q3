const mongoose = require("mongoose");


const healthTrackRecordSchema = new mongoose.Schema({
    height : {
        type : String,
        required : true
    },
    weight : {
        type : String,
        required : true
    },
    bloodPressure : {
        type : String,
        required : true
    },
    sugerLevel : {
        type : String,
        required : true
    },
    bodyTemparature : {
        type : String,
        required : true
    },
    identifiedSymptoms: {
        type: [String]
    },
    userId: {
        type : String,
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

module.exports = mongoose.model("HealthTrackRecord", healthTrackRecordSchema);