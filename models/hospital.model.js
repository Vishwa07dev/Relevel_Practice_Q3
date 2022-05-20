const mongoose = require("mongoose");
const constants = require("../utils/constants");

const hospitalSchema = new mongoose.Schema({

    /**
     * name, address, verified, createdAt, updatedAt 
     */

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    doctor_id: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref : "User"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
   
});

module.exports = mongoose.model("Hospital", hospitalSchema);