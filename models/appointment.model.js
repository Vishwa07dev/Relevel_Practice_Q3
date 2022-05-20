const mongoose = require("mongoose");
const constants = require("../utils/constants");


const appointmentSchema = new mongoose.Schema({

    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    userId : {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    doctor_id: {
        type: [mongoose.SchemaTypes.ObjectId]
    },
    hospitalId: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Hospital"
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
        }
    },
    updatedAt: {
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
    status: {
        type: String,
        default: constants.appointmentStatus.pending,
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);