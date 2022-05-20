const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({

// hospital, doctId, appointment, patientId, timing, createAt,updatedAt

hospitalId : {
    type : String,
    required : true
},
doctId : {
    type : String,
    required : true
}, 
appointmentDate : {
    type : Date,
    required : true
},
timing : {
    type : String,
    required : true
},
patientId : {
    type : String,
    required : true
},
createAt : {
    type : Date,
    immutable : true,
    default : () => {
        return Date.now();
    }
},
updatedAt : {
    type : Date,
default : ()=> {
    return Date.now();
}
}
   
})
module.exports = mongoose.model("Appointment", appointmentSchema )