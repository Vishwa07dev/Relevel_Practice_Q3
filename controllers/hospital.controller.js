const Hospital = require("../models/hospital.model");


exports.addHospital = async(req, res)=>{

    const hospitalObj = {
        name : req.body.name,
        address: req.body.address,
        doctor_id: []
    }
    try{
        const hospital = await Hospital.create(hospitalObj);
        console.log(hospital);
        return res.status(201).send(hospital);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error. "
        })
    }
};

exports.getAllHospital = async (req, res) => {
    try {
        const hospital = await Hospital.find();
        return res.status(200).send(hospital)
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

    try{
        const hospital = await Hospital.findOne({
            _id: req.params.id
        });
    
        console.log(hospital);
    
        if (hospital == null) {
            return res.status(400).send({
                message: "Hospital doesn't exist"
            })
        }
    
        hospital.name = req.body.name != undefined ? req.body.name : hospital.name;
        hospital.address = req.body.address != undefined ? req.body.address : hospital.address;
        
    
    
        const updatedHospital = await hospital.save();
    
    
    
        return res.status(200).send(updatedHospital);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
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