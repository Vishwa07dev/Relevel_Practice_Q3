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

const verifyTrackRecord = {
    verifyAddRecord : verifyAddRecord
};
module.exports= verifyTrackRecord;