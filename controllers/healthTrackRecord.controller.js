const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.addRecord = async (req, res) => {

    try {
        const user = await User.findOne({
            userId: req.userId
        });

        const healthTrackRecordObj = {
            height: req.body.height,
            weight: req.body.weight,
            bloodPressure: req.body.bloodPressure,
            sugerLevel: req.body.sugerLevel,
            bodyTemparature: req.body.bodyTemparature,
            userId: req.userId
        }

        const healthTrackRecord = await HealthTrackRecord.create(healthTrackRecordObj);

        if(healthTrackRecord){
            // update inside patient object
            console.log(user);
            user.healthTrackRecords.push(healthTrackRecord._id);
            const updatedUser = await user.save();

            return res.status(201).send(updatedUser);
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

exports.updateRecord = async (req, res) => {

    try{
        const healthTrackRecord = await HealthTrackRecord.findOne({
            _id: req.params.id
        });

        if (healthTrackRecord == null) {
            return res.status(400).send({
                message: "Track Record doesn't exist"
            })
        }

        healthTrackRecord.height = req.body.height != undefined ? req.body.height : healthTrackRecord.height;
        healthTrackRecord.weight = req.body.weight != undefined ? req.body.weight : healthTrackRecord.weight;
        healthTrackRecord.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : healthTrackRecord.bloodPressure;
        healthTrackRecord.sugerLevel = req.body.sugerLevel != undefined ? req.body.sugerLevel : healthTrackRecord.sugerLevel;
        healthTrackRecord.bodyTemparature = req.body.bodyTemparature != undefined ? req.body.bodyTemparature : healthTrackRecord.bodyTemparature;
    
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
        const healthTrackRecords = await HealthTrackRecord.find({
            userId: req.userId
        });
        return res.status(200).send(healthTrackRecords);
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
            userId: req.userId
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