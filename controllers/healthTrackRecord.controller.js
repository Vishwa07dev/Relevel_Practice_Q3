const Hospital = require("../models/hospital.model");
const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.addRecord = async (req, res) => {

    const healthTrackRecordObj = {
        height: req.body.height,
        weight: req.body.weight,
        bloodPressure: req.body.bloodPressure,
        sugerLevel: req.body.sugerLevel,
        bodyTemparature: req.body.bodyTemparature
    }

    try {
        const user = await User.findOne({
            userId: req.body.userId
        });
        
        const healthTrackRecord = await HealthTrackRecord.create(healthTrackRecordObj);

        if(healthTrackRecord){

            // update inside patient object
            User.healthTrackRecords.push(healthTrackRecord._id);
            const updatedUser = await User.save();
        }else{
            throw new Error("Failed to create Health Track Record");
        }

        return res.status(201).send(updatedUser);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

exports.updateRecord = async (req, res) => {

    try{
        const healthTrackRecord = await Hospital.findOne({
            _id: req.params.id
        });

        if (healthTrackRecord == null) {
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        healthTrackRecord.height = req.body.height != undefined ? req.body.height : hospital.height;
        healthTrackRecord.weight = req.body.weight != undefined ? req.body.weight : hospital.weight;
        healthTrackRecord.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : hospital.bloodPressure;
        healthTrackRecord.sugerLevel = req.body.sugerLevel != undefined ? req.body.sugerLevel : hospital.sugerLevel;
        healthTrackRecord.bodyTemparature = req.body.bodyTemparature != undefined ? req.body.bodyTemparature : hospital.bodyTemparature;
    
        const updatedRecord = await healthTrackRecord.save();

        return res.status(200).send(updatedRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getAllRecords = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).send(user.healthTrackRecords)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getOneRecord = async (req, res) => {
    try{
            
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        res.status(200).send(healthTrackRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.deleteRecord = async (req, res) => {
    try {
        const healthTrackRecord = await HealthTrackRecord.deleteOne({
            _id: req.params.id
        });    

        if (healthTrackRecord == null) {
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        const user = await User.findOne({
            userId: req.body.userId
        });
        
        let removableIndex = user.healthTrackRecords.indexOf(healthTrackRecord._id);
        if (removableIndex > -1) {
            user.healthTrackRecords.splice(removableIndex, 1);
        }

        const updatedUser = await user.save();
        res.status(200).send(updatedUser);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}