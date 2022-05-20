
const mongoose = require("mongoose");
const constants = require("../utils/constants");

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
     * patientId, hospitalId, doctorId, comments
     * medicines, tests - Array
     * status [ ADMIN | PATIENT | DOCTOR ]
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