const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");
const constants = require("../utils/constants");

const appointmentSchema = new mongoose.Schema({

    patient_id: {
        type : mongoose.SchemaTypes.ObjectId,
        refernce: "User",
        required: true
    },
    hospital_id:{
        type : mongoose.SchemaTypes.ObjectId,
        refernce: "Hospital",
        required: true
    },
    doctor_id:{
        type : mongoose.SchemaTypes.ObjectId,
        refernce: "Doctor",
        required: true
    },
    healthTrackRecordId:{
        type : mongoose.SchemaTypes.ObjectId,
        refernce: "Health",
        required: true
    },
    prescription: {
        type :String,
        default : "Doctor not yet given prescription ",
    },
    status :{
        type : String,
        default: constants.appoitmentStatus.pending,
    },
    createdAt : {
        type :Date,
        immutable : true,
        dafault : ()=>{
            return Date.now();
        }
    },
    appointmentScheduleTime : {
        type : Date, 
        immutable : false,
        require : true
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);