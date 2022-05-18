const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");

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

const verifyGetRecords = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        if(user.userType == constants.userType.doctor || user.userType == constants.userType.admin){
            if(!req.query.patientId || req.query.patientId == ""){
                return res.status(400).send({
                    message: "Patient Id is required to view track records"
                })
            }
            // validate patient id
            const patient = await User.findOne({
                userId: req.query.patientId
            });

            if(patient == null){
                return res.status(400).send({
                    message: "Patient Id is invalid"
                })
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
    verifyGetRecords: verifyGetRecords
};
module.exports= verifyTrackRecord;