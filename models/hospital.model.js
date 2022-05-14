const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    doctor_ids: {
        type: [mongoose.SchemaTypes.ObjectId],
    }

});

module.exports = mongoose.model("User", HospitalSchema);