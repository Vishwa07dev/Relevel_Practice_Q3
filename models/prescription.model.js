const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({

    appointment_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    prescribed_date: {      // not compulsory as appnt also
        type: Date          // has date_alloted field
    },
    medication: {
        type: String,
        required: true
    },
    medication_period: {    // stating that medication 
        type: Number,       // to be taken for so & so days
        required: true
    }
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);