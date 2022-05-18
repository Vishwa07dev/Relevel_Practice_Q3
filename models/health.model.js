const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
     
    visit_date : {
        type: Date,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
    heightIn: {
        type: Number,
        required: true
    },
    weight: {
        type : Number,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        },
    },
    updatedAt: {
            type: Date,
            default: ()=>{
           return Date.now();
        }
    }


});
module.exports = mongoose.model("Health", healthSchema);