const mongoose = require("mongoose");
const constants = require("../utils/constants");

const appointmentSchema = new mongoose.Schema({ 

    patient_id: { 
    type: mongoose.SchemaTypes.ObjectId,
    reference: "User",
    required: true
    },
    hospital_id: {
        type: mongoose.SchemaTypes.ObjectId,
        reference: "Hospital",
        required: true
    },
    doctor_id: {
        type: mongoose.SchemaTypes.ObjectId,
        reference: "User",
        required: true
    },
    healthTrackRecordId: {
        type: mongoose.SchemaTypes.ObjectId,
        reference: "Health",
        required: true
    },
    prescription: {
    type: String,   
    default: "Doctor not yet given prescription ",
    },
    status: {
        type: String,
        default: constants.appointmentStatus.pending,
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    appointmentScheduledTime : {
        type : Date,
        immutable : false,
        required : true
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);