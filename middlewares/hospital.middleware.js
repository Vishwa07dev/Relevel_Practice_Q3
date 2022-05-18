const Hospital = require("../models/hospital.model");

checkFields = async (req, res, next) => {
    
    if(!(req.body.name && req.body.address)) {
        return res.status(400).send({
            message: "Hospital name and address must be provided while creating hospital."
        });
    }
    next();

};

isHospital = async (req, res, next) => {

    const hospital = await Hospital.find({
        _id: req.params.id
    });

    if(hospital == null || hospital.length == 0) {
        return res.status(404).send({
            message: " Hospital not found, please check the hospital id"
         });
    }
    next();
}

const authHospital = {
    checkFields: checkFields,
    isHospital: isHospital
    

};

module.exports = authHospital;