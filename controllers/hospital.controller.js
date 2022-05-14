const Hospital = require('../models/hospital.model');

exports.addHospital = async (req, res) => {

    const new_hospital = {
        name: req.body.name,
        address: req.body.address,
        doctor_ids: req.body.doctor_ids
    };

    try{
        const added_hospital = await Hospital.create( new_hospital ); 
        return res.status(200).send({
            message: "added hospital",
            output: added_hospital
        });
    } catch(err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).send({
            message: err.message
        });
    }

}

exports.getHospitals = async (req, res) => {

    try{
        const hospitals = await Hospital.find({});
        return res.status(200).send({
            message: "Fetched all hospitals",
            output: hospitals
        });
    } catch(err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).send({
            message: err.message
        });
    }
}

exports.getHospitalById = async (req, res) => {

    const hosp_id = req.params.id;

    try{
        const hospital = await Hospital.findOne({"_id": hosp_id});
        if(hospital) {
            return res.status(200).send({
                message: "Fetched hospital by id",
                output: hospital
            })
        } else {
            return res.status(401).send({
                message: "No such hospital exists"
            });
        }
    } catch(err) {
        console.log(`Error: ${err.message}`);
        return res.status(500).send({
            message: err.message
        });
    }
}

exports.updateHospital = async (req, res) => {

    const hosp_id = req.params.id;

    try{
        const hospital = await Hospital.findOne({"_id": hosp_id});
        if(hospital) {
            hospital.name != undefined? req.body.name : hospital.name, 
            hospital.address != undefined? req.body.address : hospital.address, 
            hospital.doctor_ids != undefined? req.body.doctor_ids : hospital.doctor_ids

            // saving the changes
            await hospital.save();

            // returning updated details
            return res.status(200).send({
                message: "updated hospital details",
                output: hospital
            });            
        } else {
            return res.status(401).send({
                message: "No such hospital exists"
            });
        }
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }

}

exports.deleteHospital = async (req, res) => {

    const hosp_id = req.params.id;

    try{
        const hospital = await Hospital.findOneAndDelete({"_id": hosp_id});
        if(hospital != null) {
            return res.status(200).send({
                message: "deleted hospital, showing its record before deleting.",
                output: hospital
            });
        } else {
            return res.status(401).send({
                message: "No such hospital exists"
            });
        }
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }

}