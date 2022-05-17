const Hospital = require('../models/hospital.model');



// create hospital
exports.createHospital = async (req, res) => {
    const hospitalObj = {
        name: req.body.name,
        address: req.body.address
    }

    try {
        const createdHospital = await Hospital.create(hospitalObj);

        res.status(201).send({
            success: true,
            createdHospital
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error"
        })
    }
}

// get all hospitals

exports.getAllHospitals = async (req, res) => {

    try {
        const hospitals = await Hospital.find();

        res.status(200).send({
            success: true,
            hospitals
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error"
        })
    }
}

// get hospital by id
exports.getHospitalDetails = async (req, res) => {

    try {
        const hospital = await Hospital.findById(req.params.id);

        res.status(200).send({
            success: true,
            hospital
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error"
        })
    }
}

// update hospital
exports.updateHospital = async (req, res) => {

    try {
        const hospital = await Hospital.findOne({ _id: req.params.id });

        if (!hospital) {
            return res.status(404).send({
                success: true,
                message: "Hospital not found"
            })
        }

        // update hospital
        hospital.name = req.body.name != undefined ? req.body.name : hospital.name
        hospital.address = req.body.address != undefined ? req.body.address : hospital.address
        // save 
        await hospital.save();

        res.status(201).send({
            success: true,
            hospital
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error"
        })
    }
}

// delete hospital
exports.deleteHospital = async (req, res) => {

    try {
        const hospital = await Hospital.deleteOne({ _id: req.params.id });

        if (!hospital) {
            return res.status(404).send({
                success: true,
                message: "Hospital not found"
            })
        }

        res.status(200).send({
            success: true,
            message: `Hospital with id ${hospital._id} deleted successfully`
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error"
        })
    }
}