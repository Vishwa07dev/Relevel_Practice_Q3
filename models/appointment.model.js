
const mongoose = require("mongoose");
const constants = require("../utils/constants");

const appointmentSchema = new mongoose.Schema({
    /**
     * patientId, hospitalId, doctorId, date, cost, updatedAt, identifiedSymptoms
     * prescription [ref]
     * status [ OPEN | CANCEL | COMPLETE ]
     */
    patientId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hospitalId: {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "Hospital"
    },
    doctorId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    date : {
        type : Date,
        required : true
    },
    cost : {
        type : Number,
        required : true
    },
    status: {
        type: String,
        default: constants.appointmentStatus.open,
        enum: [constants.appointmentStatus.open, constants.appointmentStatus.complete, constants.appointmentStatus.cancel]
    },
    identifiedSymptoms: {
        type: [String]
    },
    prescription: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Prescription"
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

module.exports = mongoose.model("Appointment", appointmentSchema);
