const Prescription = require("../models/prescription.model");
const Appointment = require("../models/appointment.model");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * DOCTOR will create prescription based on appointment
 */
exports.createPrescription = async (req, res) => {

    try {
        const user = await User.findOne({
            userId: req.userId
        });

        const appointment = await Appointment.findOne({
            _id: req.body.appointmentId
        });

        // prepare prescription object
        const prescriptionObj = {
            patientId: appointment.patientId,
            hospitalId: appointment.hospitalId,
            doctorId: appointment.doctorId,
            medicines: req.body.medicines,
            tests: req.body.tests,
            comments: req.body.comments
        }

        // insert object into database
        const prescription = await Prescription.create(prescriptionObj);

        if(prescription){

            // updated created prescription inside appointment and save
            appointment.prescription = prescription;
            appointment.status = constants.appointmentStatus.complete;
            const updatedAppointment = await appointment.save();

            // return created prescription
            return res.status(201).send(prescription);
        }else{
            throw new Error("Failed to create Prescription");
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error" + err.message
        })
    }

}

/**
 * Valid User can update prescription details
 */
exports.updatePrescription = async (req, res) => {

    try{
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        // update respective fields from request body
        prescription.medicines = req.body.medicines != undefined ? req.body.medicines : prescription.medicines;
        prescription.tests = req.body.tests != undefined ? req.body.tests : prescription.tests;
        prescription.comments = req.body.comments != undefined ? req.body.comments : prescription.comments;
        
        // save updated record into database
        const updatedPrescription = await prescription.save();
        
        // return updated record
        return res.status(200).send(updatedPrescription);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * ADMIN can get all prescriptions
 * PATIENT will get all prescriptions where he/she is owner.
 * DOCTOR will get prescriptions where he is DOCTOR
 */
exports.getAllPrescriptions = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};
        
        // PATIENT will get all prescriptions where he/she is owner.
        if(user.userType == constants.userType.patient){
            queryObj.patientId = user._id;
        }
        // DOCTOR will get prescriptions where he is DOCTOR
        else if(user.userType == constants.userType.doctor){
            queryObj.doctorId = user._id;
        }

        // return found records
        const prescriptions = await Prescription.find(queryObj);

        return res.status(200).send(prescriptions);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * GET Single record based on its id
 */
exports.getOnePrescription = async (req, res) => {
    try{
        // get record based on id from database
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        // return found record
        res.status(200).send(prescription);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * Delete Prescription
 */
exports.deletePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        // delete prescription
        await Prescription.deleteOne({
            _id: req.params.id
        });
        
        res.status(200).send({
            message: "Prescription deleted successfully"
        });

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}