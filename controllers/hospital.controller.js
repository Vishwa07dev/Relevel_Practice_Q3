const Hospital = require("../models/hospital.model");

/**
 * Add Hospital
 */
exports.addHospital = async (req, res) => {

    // prepare hospital object to store inside database
    const hospitalObj = {
        name: req.body.name,
        address: req.body.address,
        doctor_ids: []
    }

    try {
        // insert hospital object into database
        const hospital = await Hospital.create(hospitalObj);
        // console.log(hospital)

        // return created hospital
        return res.status(201).send(hospital);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

/**
 * GET all hospitals based
 */
exports.getAllHospital = async (req, res) => {
    try {
        // find all hospitals
        const hospital = await Hospital.find();
        
        // return found hospital
        return res.status(200).send(hospital)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
 * GET Single hospital based on its id
 */
exports.getOneHospital = async (req, res) => {
    try{
        // get hospital based on id from database
        const hospital = await Hospital.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(hospital);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * UPDATE Hospital data
 */
exports.updateHospital = async (req, res) => {

    try{
        const hospital = await Hospital.findOne({
            _id: req.params.id
        });
    
        // console.log(hospital);
    
        // check whether hospital exists or not
        if (hospital == null) {
            return res.status(400).send({
                message: "Hospital doesn't exist"
            })
        }
    
        // update respective fields
        hospital.name = req.body.name != undefined ? req.body.name : hospital.name;
        hospital.address = req.body.address != undefined ? req.body.address : hospital.address;    
    
        // save updated object
        const updatedHospital = await hospital.save();
    
        // return saved object
        return res.status(200).send(updatedHospital);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}

/**
 * Delete Hospital object
 */
exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({
            _id: req.params.id
        });

        // check whether hospital is valid or not
        if (hospital == null) {
            return res.status(400).send({
                message: "Hospital doesn't exist"
            })
        }

        // delete object from database
        await Hospital.deleteOne({
            _id: req.params.id
        });

        res.status(200).send({
            message : "Hospital succesfully deleted"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}