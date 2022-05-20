
const mongoose = require("mongoose");


const hospitalSchema = new mongoose.Schema({

    /**
     * name, address, verified, createdAt , updatedAt
     */
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    doctor_ids :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Users"
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

module.exports = mongoose.model("Hospitals", hospitalSchema);
