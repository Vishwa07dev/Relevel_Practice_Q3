const Hospital = require("../models/hospital.model"); 
const objectConverter = require("../utils/objectConverter");

exports.createHospital = async (req, res) => {

    const hospitalObjToBeStoredInDB = {
        name : req.body.name,
        address : req.body.address,
    }

 try {
    const hospitalCreated = await Hospital.create(hospitalObjToBeStoredInDB);

    console.log("Hospital Created ", hospitalCreated);

    return res.status(201).send(objectConverter.hospitalCreationObject(hospitalCreated));

} catch(err){
    console.error("Error while creating new hospital", err.message);
    return res.status(500).send({
        message : "some internal error while inserting new hospital"
    })
    }
}

exports.updateHospital = async (req, res) => {
    try {

    const hospital = await Hospital.find({
        _id: req.params.id
    });

    hospital.name = req.body.name != undefined ? req.body.name: hospital.name;
    hospital.address = req.body.name != undefined ? req.hospital.address: hospital.address;
    
    if(req.body.doctor_ids) {
        hospital.doctor_ids.push(req.body.doctor_ids);
    }
    
    const updatedHospitalDetails = await hospital.save();

    return res.status(200).send({
        updatedHospitalDetails: updatedHospitalDetails
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating hospital details."
        });
    }
}

exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({});

    return res.status(200).send(hospitals);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while fetching hospital/s details."
        });
    }
}  

exports.getHospital = async (req, res) => {
    try {
        const hospital = await Hospital.find({
        _id: req.params.id
    });

    return res.status(200).send({
        hospital_details: hospital
    })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while fetching hospital details."
        });
    }
}  

exports.deleteHospital = async (req, res) => {

    try {
        await Hospital.findOneAndDelete({
        _id: req.params.id
    });

    return res.status(200).send({
        success: true,
        message: "Hospital details were deleted"
    })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while deleting hospital details."
        });
    }
}  

