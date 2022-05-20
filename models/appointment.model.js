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
    attending_doctor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    date_alloted: {
        type: String  // maybe like 19th May 2022 - 1:00 P.M.
    },
    doctor_backgound: {
        type: String    // maybe like "the doctor is very good at treating ..."
    },                  // and has more than 4 yrs of expr in this subject.
    patient_symptoms: {
        type: String,
        required: true
    },
    prescription_id: {
        type: mongoose.SchemaTypes.ObjectId
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