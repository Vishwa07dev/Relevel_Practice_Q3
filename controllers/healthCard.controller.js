const HealthCard = require('../models/healthCard.model');
const User = require('../models/user.model');


// user needs to pass access token to add health card
exports.addHealthCard = async (req, res) => {
    const healthCardObj = {
        weight: req.body.weight,
        height: req.body.height,
        bodyTemperature: req.body.bodyTemperature,
        bloodPressure: req.body.bloodPressure,
        symptoms: req.body.symptoms
    }

    try {
        const healthCardCreated = await HealthCard.create(healthCardObj);
        // find user from access token
        const user = await User.findOne({ userId: req.userId });
        // update user
        user.healthCard_id = healthCardCreated._id;
        await user.save();
        res.status(201).send({
            success: true,
            healthCardCreated
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: "Some Internal error."
        })
    }
}

// how patient get health card
exports.getHealthCard = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.userId })

        const healthCard = await HealthCard.findOne({ _id: user.healthCard_id })

        res.status(200).send(healthCard);

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: "Some Internal error."
        })
    }
}

// update healthCard

// how patient get health card
exports.updateHealthCard = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.userId });
        const healthCard = await HealthCard.findOne({ _id: user.healthCard_id })


        if (!healthCard) {
            return res.status(404).send({
                message: "health card not found"
            })
        }

        healthCard.weight = req.body.weight != undefined ? req.body.weight : healthCard.weight;
        healthCard.height = req.body.height != undefined ? req.body.height : healthCard.height;
        healthCard.bodyTemperature = req.body.bodyTemperature != undefined ? req.body.bodyTemperature : healthCard.bodyTemperature;
        healthCard.bloodPressure = req.body.bloodPressure != undefined ? req.body.bloodPressure : healthCard.bloodPressure;
        healthCard.symptoms = req.body.symptoms != undefined ? req.body.symptoms : healthCard.symptoms;

        await healthCard.save();


        res.status(200).send(healthCard);


    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: "Some Internal error."
        })
    }
}