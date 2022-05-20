const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Prescription = require("../models/prescription.model");
const constants = require("../utils/constants");
const mongoose = require("mongoose");

/**
 * Validate Create Prescription
 */
const verifyCreatePrescription = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        if(user.userType == constants.userType.patient){
            return res.status(400).send({
                message: "Requires DOCTOR/ADMIN Role"
            })
        }

        // check if given ObjectId is valid or not
        if(!mongoose.Types.ObjectId.isValid(req.body.appointmentId)){
            return res.status(400).send({
                message: "Appointment Id is not valid"
            })
        }

        const appointment = await Appointment.findOne({
            _id: req.body.appointmentId
        });

        // validate appointment
        if(appointment == null){
            return res.status(400).send({
                message: "Invalid Appointment Id"
            })
        }

        // check appointment is in OPEN State or not
        if(appointment.status != constants.appointmentStatus.open){
            return res.status(400).send({
                message: "This appointment is not in OPEN state"
            })
        }

        if(user.userType == constants.userType.doctor){
            if(appointment.doctorId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Doctor Id is not valid for this appointment"
                })
            }
        }

        // if prescription already available, infrom to update
        if(appointment.prescription){
            return res.status(200).send({
                message: "Prescription for this appointment already available, please update if needed"
            })
        }

        next();
    } catch (err) {
        console.log("verifyAddRecord", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

/**
 * Verify whether Prescription is valid or not
 */
const verifyValidPrescriptionForChange = async (req,res, next) =>{
    try {

        const user = await User.findOne({
            userId: req.userId
        });

        // PATIENT cannot delete or update prescription
        if(user.userType == constants.userType.patient){
            return res.status(400).send({
                message: "Requires DOCTOR/ADMIN Role"
            })
        }

        // check if given ObjectId is valid or not
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send({
                message: "Prescription Id is not valid"
            })
        }
        
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        // validate prescription
        if(prescription == null){
            return res.status(400).send({
                message: "Invalid Prescription Id"
            })
        }

        const appointment = await Appointment.findOne({
            prescription: prescription._id
        });

        if(user.userType == constants.userType.doctor){
            if(appointment.doctorId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Doctor Id is not valid for this appointment"
                })
            }
        }

        
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

/**
 * Check if User is valid OWNER OR ADMIN
 */
const isOwnerOfPrescriptionOrAdmin = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        if(user.userType != constants.userType.admin){
            // Check Valid OWNER
            if(prescription.patientId.valueOf() != user._id.valueOf() && prescription.doctorId.valueOf() != user._id.valueOf()){
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
};

const verifyPrescription = {
    verifyCreatePrescription : verifyCreatePrescription,
    verifyValidPrescriptionForChange: verifyValidPrescriptionForChange,
    isOwnerOfPrescriptionOrAdmin: isOwnerOfPrescriptionOrAdmin
};
module.exports= verifyPrescription;