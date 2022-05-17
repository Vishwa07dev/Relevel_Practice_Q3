const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({

    name: {
        type : String,
        required : true
    },
    address: { 
        type : String,
        required : true 
    },
    doctor_ids: {
        type: Array,
        required: true
    }
    
});

module.exports = mongoose.model("hospital", hospitalSchema);