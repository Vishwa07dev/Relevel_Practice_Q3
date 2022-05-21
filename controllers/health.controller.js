const User = require("../models/user.model");
const Health = require("../models/health.model");

exports.createHealthTrackRecord = async (req, res) => {

    const user = await User.find({_id: req.user_id});

    const HealthTrackRecordObj = {
        userId: req.userId,
        height: req.body.height,
        weight: req.body.weight,
        bloodPressure: req.body.bloodPressure,
        sugarLevel: req.body.sugarLevel,
        identifiedSymptoms: req.body.identifiedSymptoms,
    }

    try {

    const isHealthTrackRecordCreated = await Health.create(HealthTrackRecordObj);

    if(!isHealthTrackRecordCreated) {
       return res.status(500).send({
        message: 'Some internal error occurred while creating the health track record.'
        });
    }
    user.healthTrackRecords.push(isHealthTrackRecordCreated._id);
        await user.save();
        return res.status(201).send(isHealthTrackRecordCreated._id);
    
  } catch(err){
    console.error("Error while creating new user", err.message);
    res.status(500).send({
        message : "some internal error while inserting new user"
    });
  }
}

exports.updateHealthTrackRecord = async (req, res) => {

    try{
        const healthRecord = await Health.find({
            _id: req.params.id
        });

        if (healthRecord == null)  {
            return res.status(404).send({
                message: "Health Record not found"
            });
        }

        healthTrackRecord.height = req.body.height != undefined ? req.body.height : healthTrackRecord.height;
        healthTrackRecord.weight = req.body.weight != undefined ? req.body.weight : healthTrackRecord.weight;
        healthTrackRecord.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : healthTrackRecord.bloodPressure;
        healthTrackRecord.sugarLevel = req.body.sugarLevel != undefined ? req.body.sugarLevel : healthTrackRecord.sugarLevel;
        healthTrackRecord.identifiedSymptoms = req.body.identifiedSymptoms != undefined ? req.body.identifiedSymptoms : healthTrackRecord.identifiedSymptoms;

        const updatedRecord = await healthTrackRecord.save();

        return res.status(200).send(updatedRecord);
    } catch(err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        });
    }
}

exports.getAllHealthTrackRecords = async (req, res) => {

     const mongoQueryObj = {};

    if (req.query.name && req.query.type) {
        mongoQueryObj.name = req.query.name;
        mongoQueryObj.userType = req.query.type;
    } else if (req.query.name) {
        mongoQueryObj.name = req.query.name;
    } else if (req.query.type) {
        mongoQueryObj.userType = req.query.type;
    }

    try {
        const healthRecords = Health.find(mongoQueryObj);

        return res.status(200).send(healthRecords);
    } catch (err) {
         console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        });
    }
}

exports.getHealthTrackRecord = async (req, res) => {

    const _id = req.params.id;
    try {
        const HealthTrackRecord = Health.find({_id: _id});

        return res.status(200).send(HealthTrackRecord);
    } catch (err) {
         console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        });
    }
}

exports.deleteHealthRecord = async (req, res) => {

    try {
        const healthTrackRecord = await Health.findOneAndDelete({_id: req.params.id});

        if(!healthTrackRecord) {
            return res.status(500).send({
                message: "Internal error while deleting health record"
            });
        }
           const user = await User.find({
            userId: req.userId
        });

        const removeIndex = user.healthRecords.indexOf(healthRecords._id);
        if (removeIndex > -1) {
            user.healthRecords.splice(removeIndex, 1);
        }
        const updatedUser = await user.save();
    return res.status(200).send({
        updatedUser
    });
    } catch (err) {
         console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        });
    }
}