const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({


doctorName : {
    type : String,
    required : true
},

doctorId : {
    type : String,
    required : true,
    unique : true
},
typeOfDoctor : {
    type : String,
    required : true
},
 appointmentDate : {
     type : Date & Time,
     required : true
 }

 
 module.exports = mongoose.model("Appointment", appointmentSchema )

})