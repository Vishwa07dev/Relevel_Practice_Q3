const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const constants = require("../utils/constants");

exports.createAppointment = async (req, res) => {

    appointmentObjToBeStoredInDB = {
        patient_id: req.body.patient_id,
        hospital_id : req.body.hospital_id,
        doctor_id: req.body.doctor_id,
        healthTrackRecordId : req.body.healthTrackRecordId,
    };
    try { 
        const user = await find({_id: req.userId});
        const appointmentCreated = await Appointment.create(appointmentObjToBeStoredInDB);

        if(!appointmentCreated) {
            return res.status(500).send({
                message: "Some internal error while creating appointment"
            });
        }

        user.appointments.push(appointmentCreated._id);
        await user.save();

        return res.status(201).send(appointmentCreated); 

    } catch(err){
    console.error("Error while creating appointment", err.message);
    res.status(500).send({
        message : "Some internal error while creating appointment"
    })
    }
}

exports.providePrescription = async (req, res) => {

    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.find({_id: appointmentId});

    appointment.prescription = req.body.prescription;

    appointment.status = constants.appointmentStatus.completed;

    await appointment.save();

    return res.status(200).send(appointment);
    } catch(err){
    console.error("Error while updating prescription", err.message);
    res.status(500).send({
        message : "Some internal error while updating prescription"
    });
    }
}

exports.getPrescription = async (req, res) => {

    try {
        const patient = await User.find({userId: req.userId});

        if(!patient.appointments.includes(req.params.id)) {
            return res.status(403).send({
                message: "can't find appointment in the patient database for the given appointment id"
            });
        }
        const appointment = await Appointment.find({_id: req.params.id});

        return res.status(200).send(appointment.prescription);
    } catch(err){
    console.error("Error while updating prescription", err.message);
    res.status(500).send({
        message : "Some internal error while updating prescription"
    });
    }
}