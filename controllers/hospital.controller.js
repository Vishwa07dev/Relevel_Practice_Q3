const Hospital = require("../models/hospital.model"); 

exports.createHospital = async (req, res) => {

    const hospitalObjToBeStoredInDB = {
        name : req.body.name,
        address : req.body.address,
        doctor_ids: req.body.doctor_ids
    }

 try {
    const hospitalCreated = await Hospital.create(hospitalObjToBeStoredInDB);

    console.log("Hospital Created ", hospitalCreated);

    /**
     * Return the response
     */
    const hospitalCreationResponse  = {
        name : hospitalCreated.name,
        address : hospitalCreated.address,
        doctor_ids: hospitalCreated.address
    }
    res.status(201).send(hospitalCreationResponse);

} catch(err){
    console.error("Error while creating new hospital", err.message);
    res.status(500).send({
        message : "some internal error while inserting new hospital"
    })
    }
}

exports.updateHospital = async (req, res) => {
    try {

    const hospital = await find({
        _id: req.params.id
    });

    hospital.name = req.body.name != undefined ? req.body.name: hospital.name;
    hospital.address = req.body.name != undefined ? req.hospital.address: hospital.address;
    
    if(req.body.doctor_ids) {
        hospital.doctor_ids.push(req.body.doctor_ids);
    }
    

    const updatedHospitalDetails = await hospital.save();

    return res.status(200).send({
        message: "Successfully updated hospital details",
        updatedHospitalDetails: updatedHospitalDetails
    });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some internal error occurred while updating hospital details."
        });
    }
}

exports.getHospital = async (req, res) => {
    try {

        const hospital = await find({
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
