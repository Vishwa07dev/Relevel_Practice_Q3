const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const constants = require("../utils/constants");
const mongoose = require("mongoose");

isOwnerOfAppointmentOrAdmin = async (req,res, next) =>{
    try {
        /**
         * Fetcht user from the DB using the userId
         */
        const user = await User.findOne({
            userId: req.userId
        });
        
        // check whether it is valid or not
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                message: "Appointment Id is not valid"
            })
        }
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        if(appointment == null){
            return res.status(400).send({
                message: "Appointment doesn't exist"
            })
        }

        // check if DOCTOR or PATIENT is valid OWNER
        if(user.userType != constants.userType.admin){
            // console.log(appointment.patientId.valueOf(), appointment.doctorId.valueOf(), user._id.valueOf());
            // console.log(appointment.patientId.valueOf() != user._id.valueOf(), appointment.doctorId.valueOf() != user._id.valueOf());
            if(appointment.patientId.valueOf() != user._id.valueOf() && appointment.doctorId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the OWNER/ADMIN has access to this operation"
                })
            }
        }
        
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }
}

const verifyAppointment = {
    isOwnerOfAppointmentOrAdmin : isOwnerOfAppointmentOrAdmin
};
module.exports= verifyAppointment;