const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

    /**
     *  medicines, nextappointment, createdAt
     */
      userId: {
          type: String,
          ref: "User"
      },
    medicines: {
        type: String,
        required: true 
    },
    nextAppointment: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
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

module.exports = mongoose.model("Prescription", prescriptionSchema);