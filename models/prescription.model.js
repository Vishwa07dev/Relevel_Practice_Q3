
const mongoose = require("mongoose");

const medicalSchema = {
    /**
     * name, quantity, comments
     */
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    comments: {
        type: String
    }
};

const prescriptionSchema = new mongoose.Schema({
    /**
     * appointmentId, comments
     * medicines, tests - Array
     * status [ ADMIN | PATIENT | DOCTOR ]
     */
    appointmentId: {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "Appointment"
    },
    medicines : {
        type : [medicalSchema]
    },
    tests: {
        type : [String]
    },
    comments: {
        type: String
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

module.exports = mongoose.model("Prescription", prescriptionSchema);