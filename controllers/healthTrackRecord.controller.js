const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

/**
 * Patient will add healthTrackRecord on daily basis
 */
exports.addRecord = async (req, res) => {

    try {
        // get user details
        const user = await User.findOne({
            userId: req.userId
        });

        // prepare record object to store in database
        const healthTrackRecordObj = {
            height: req.body.height,
            weight: req.body.weight,
            bloodPressure: req.body.bloodPressure,
            sugerLevel: req.body.sugerLevel,
            bodyTemparature: req.body.bodyTemparature,
            identifiedSymptoms: req.body.identifiedSymptoms,
            userId: req.userId,
        }

        // insert record into database
        const healthTrackRecord = await HealthTrackRecord.create(healthTrackRecordObj);

        if(healthTrackRecord){
            // update inside patient object
            user.healthTrackRecords.push(healthTrackRecord._id);
            const updatedUser = await user.save();

            // return created record
            return res.status(201).send(healthTrackRecord);
        }else{
            throw new Error("Failed to create Health Track Record");
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * PATIENT OR respected ADMIN can update record details
 */
exports.updateRecord = async (req, res) => {

    try{
        // get record from database
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        // validate record
        if (healthTrackRecord == null) {
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        // update respective fields from request body
        healthTrackRecord.height = req.body.height != undefined ? req.body.height : healthTrackRecord.height;
        healthTrackRecord.weight = req.body.weight != undefined ? req.body.weight : healthTrackRecord.weight;
        healthTrackRecord.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : healthTrackRecord.bloodPressure;
        healthTrackRecord.sugerLevel = req.body.sugerLevel != undefined ? req.body.sugerLevel : healthTrackRecord.sugerLevel;
        healthTrackRecord.bodyTemparature = req.body.bodyTemparature != undefined ? req.body.bodyTemparature : healthTrackRecord.bodyTemparature;
        healthTrackRecord.identifiedSymptoms = req.body.identifiedSymptoms != undefined ? req.body.identifiedSymptoms : healthTrackRecord.identifiedSymptoms;
    
        // save updated record into database
        const updatedRecord = await healthTrackRecord.save();

        // return updated record
        return res.status(200).send(updatedRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * ADMIN can get all appointments
 * PATIENT will get all appointments booked by him/her.
 */
exports.getAllRecords = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};
        
        // If fetching user is DOCTOR or ADMIN they need to provide patientID as query parameter
        if(user.userType == constants.userType.doctor || user.userType == constants.userType.admin){
            queryObj.userId = req.query.patientId;
        }else{
            queryObj.userId = req.userId;
        }

        // get respective records from database
        const healthTrackRecords = await HealthTrackRecord.find(queryObj);

        // return found records
        return res.status(200).send(healthTrackRecords);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * GET Single record based on its id
 */
exports.getOneRecord = async (req, res) => {
    try{
        // get record based on id from database
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(healthTrackRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * Delete Track record
 */
exports.deleteRecord = async (req, res) => {
    try {
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        // check whether record is valid or not
        if (healthTrackRecord == null) {
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        // delete if valid
        await HealthTrackRecord.deleteOne({
            _id: req.params.id
        });

        const user = await User.findOne({
            userId: healthTrackRecord.userId
        });
        
        // remove record from user track records
        let removableIndex = user.healthTrackRecords.indexOf(healthTrackRecord._id);
        if (removableIndex > -1) {
            user.healthTrackRecords.splice(removableIndex, 1);
        }

        // save user
        const updatedUser = await user.save();
        res.status(200).send({
            message: "Track record deleted successfully"
        });

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}