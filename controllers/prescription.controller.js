const Prescription = require('../models/prescription.model');

exports.providePrescription = async (req, res) => {

    /**
     * Only a DOCTOR can perform this task
     * ADMIN can also perform but not without doctor's check
     */

    const new_prescription = {
        appointment_id: req.body.appnt_id,
        medication: req.body.medication,
        medication_period: req.body.medication_period,
    };

    try{
        const added_prescription = await Prescription.create( new_prescription );
    
        return res.status(201).send({
            message: "added prescription successfully",
            output: added_prescription
        });
    } catch(err) {
        console.log("Error while adding prescription:", err.message);
        return res.status(500).send({
            message: err.message
        });
    }

}
