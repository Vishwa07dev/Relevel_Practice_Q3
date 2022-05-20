const mongoose = require("mongoose");
const constants = require("../utils/constants");
const doctorSchema = new mongoose.Schema({


    // name,doctId,qualification, patients, appointments

    name : {
        type : String,
        required : true
},
doctId : {
    type : String,
    required : true,
    unique : true
},
qualification : {
    type : String,
    required : true
},
appointments : {
    type : [mongoose.SchemaType.ObjectId],
    ref : "User"
},
timing : {
    type : String,
    required : true
},

});

module.exports = mongoose.model("Doctor", doctorSchema);


