const mongoose = require('mongoose');


const healthCardSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required:true
    },
    height:{
        type: Number,
        required:true
    },
    bodyTemperature:{
        type: Number,
        required:true
    },
    bloodPressure:{
        type: Number,
        required:true
    },
    symptoms:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("HealthCard", healthCardSchema);