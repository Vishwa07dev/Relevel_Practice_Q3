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
    doctorIds: {
        type: [mongoose.SchemaTypes.ObjectId],
        reference: "User"
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
    }
});

module.exports = mongoose.model("Hospital", hospitalSchema);