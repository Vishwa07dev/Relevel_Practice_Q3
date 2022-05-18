const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    visit_Date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    doctor_id: {
        type : [mongoose.SchemaTypes.ObjectId] 
    },
    hospitalId : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Hospital"
    },
    symptoms: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        },
    },
    updatedAt: {
            type: Date,
            default: ()=>{
           return Date.now();
        }
    }


});
module.exports = mongoose.model("Appointment", appointmentSchema);