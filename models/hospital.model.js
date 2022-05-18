const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({



// name, address, verify, createdAt,updatedAt

name : {
    type : String,
    required : true
},
address : {
    type : String,
    required : true
},
doctor_ids : {
type : [mongoose.SchemaType.ObjectId]
},
createdAt : {
    type : Date,
    immutable : true,
    default : () => {
        return Date.now();
    }

},

updatedAt : {
    type : Date,
    default : () => {
        return Date.now();
    }
},


});

module.exports = mongoose.model("Hospital", hospitalSchema);



