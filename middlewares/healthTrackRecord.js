const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const Appointment = require("../models/appointment.model");

/**
 * If already a track record created for current_date, raise error
 */
const verifyAddRecord = async (req,res, next) =>{
    // If already a track record created for current_date, raise error
    try {
        const currentDate = new Date();
        const healthTrackRecord = await HealthTrackRecord.findOne({
            userId: req.userId,
            createdAt: {
                $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString()
            }
        });
    
        if(healthTrackRecord){
            return res.status(200).send({
                message: "Track Record for current date already exists, please update if needed ^_^"
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
 * Is Valid Owner of record
 */
const isOwnerOfHealthRecord = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });
        
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        // validate Track record
        if(healthTrackRecord == null){
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        // check valid owner
        if(user.userType == constants.userType.patient){
            if(healthTrackRecord.userId != req.userId){
                return res.status(400).send({
                    message: "Only the OWNER has access to this"
                })
            }
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
 * Validate DOCTOR and PatientId Query Parameter
 */
const verifyGetRecords = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        // If user is DOCTOR or ADMIN Query parameter is required
        if(user.userType == constants.userType.doctor || user.userType == constants.userType.admin){
            if(!req.query.patientId || req.query.patientId == ""){
                return res.status(400).send({
                    message: "Patient Id is required to view track records"
                })
            }
            
            const patient = await User.findOne({
                userId: req.query.patientId
            });

            // validate patient id
            if(patient == null){
                return res.status(400).send({
                    message: "Patient Id is invalid"
                })
            }

            // check whether DOCTOR is associated with patient or not
            if(user.userType == constants.userType.doctor){
                const appointment = await Appointment.findOne({
                    patientId: patient._id,
                    doctorId: user._id,
                    status: constants.appointmentStatus.open
                });

                if(appointment == null){
                    return res.status(400).send({
                        message: "Youre currently not associated with this patient"
                    })
                }
            }
        }

        next();
    } catch (err) {
        return res.status(500).send({
            message: "Some internal error"
        })
    }
};

const verifyTrackRecord = {
    verifyAddRecord : verifyAddRecord,
    verifyGetRecords: verifyGetRecords,
    isOwnerOfHealthRecord: isOwnerOfHealthRecord
};
module.exports= verifyTrackRecord;