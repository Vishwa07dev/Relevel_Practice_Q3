const Hospital = require("../models/hospital.model");

/**
 * Create a Company - company
 *   v1 - Any one should be able to create the ticket
 */

exports.addHospital = async (req, res) => {

    //logic to create the ticket

    const hospitalObj = {
        name: req.body.name,
        address: req.body.address,
        doctor_ids: []
    }

    try {
        const hospital = await Hospital.create(hospitalObj);
        console.log(hospital)

        return res.status(201).send(hospital);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

exports.getAllHospital = async (req, res) => {
    try {
        const hospital = await Hospital.find();
        res.status(200).send(hospital)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

exports.getOneHospital = async (req, res) => {
    try{
            
        const hospital = await Hospital.findOne({
            _id: req.params.id
        });

        res.status(200).send(hospital);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.updateHospital = async (req, res) => {

    const hospital = await Hospital.findOne({
        _id: req.params.id
    });

    console.log(hospital);

    if (hospital == null) {
        return res.status(200).send({
            message: "Hospital doesn't exist"
        })
    }



    hospital.name = req.body.name != undefined ? req.body.name : hospital.name;
    hospital.address = req.body.address != undefined ? req.body.address : hospital.address;
    hospital.doctor_ids = req.body.doctor_ids != undefined ? req.body.doctor_ids : hospital.doctor_ids;


    const updatedHospital = await hospital.save();



    return res.status(200).send(updatedHospital);
}

exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.deleteOne({
            _id: req.params.id
        });    
        res.status(200).send({
            message : "succesfully deleted hospital"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}