const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const constants = require("../utils/constants");

exports.createAppointment = async (req, res) => {

    appointmentObjToBeStoredInDB = {
        patientId: req.body.patientId,
        hospitalId : req.body.hospitalId,
        doctorId: req.body.doctorId,
        healthTrackRecordId : req.body.healthTrackRecordId,
    };
    try { 
        const user = await find({_id: req.userId});
        const doctor = await find({_id: req.body.doctorId});
        const appointmentCreated = await Appointment.create(appointmentObjToBeStoredInDB);

        if(!appointmentCreated) {
            return res.status(500).send({
                message: "Some internal error while creating appointment"
            });
        }

        user.appointments.push(appointmentCreated._id);
        doctor.patientAppointments.push(appointmentCreated._id);

        await user.save();
        await doctor.save();

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

exports.getAppointments = async (req, res) => {

    try {
        const doctor = await User.find({userId: req.userId});

        if(!doctor.patientAppointments) {
            return res.status(200).send({
                message: "No appointments were booked till now"
            });
        }
        return res.status(200).send(doctor.patientAppointments);
    } catch(err){
    console.error("Error while fetching appointments", err.message);
    res.status(500).send({
        message : "Some internal error  while fetching appointments"
    });
    }
}