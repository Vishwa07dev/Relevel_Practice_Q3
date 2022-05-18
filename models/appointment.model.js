const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hospital_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Hospital"
    },
    hospital_name: {
        type: String,
        required: true
    },
    date_alloted: {
        type: String  // maybe like 19th May 2022 - 1:00 P.M.
    },
    attending_doctor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    doctor_backgound: {
        type: String    // maybe like "the doctor is very good at tresting ..."
    },                  // and has more than 4 yrs of expr in this subject/ailment treatment
    patient_symptoms: {
        type: String,
        required: true
    },
    prescription: {
        type: String
    },
    post_med_visit_required: {    // post medication period
        type: Boolean,
        default: false
    },
    next_visit_date: {
        type: String
    },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);