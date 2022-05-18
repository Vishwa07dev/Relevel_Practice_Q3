const Appointment = require("../models/appointment.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.takeAppointment = async (req, res) => {

    try {
        const user = await User.findOne({
            userId: req.userId
        });
        const doctor = await User.findOne({
            _id: req.body.doctorId
        });

        if(doctor == null){
            return res.status(400).send({
                message: "Invalid doctor Id"
            })
        }

        const appointmentObj = {
            patientId: user._id,
            doctorId: req.body.doctorId,
            date: req.body.date,
            cost: req.body.cost,
            identifiedSymptoms: req.body.identifiedSymptoms
        }

        const appointment = await Appointment.create(appointmentObj);

        if(appointment){
            // update inside patient object
            user.appointments.push(appointment._id);
            const updatedUser = await user.save();

            // save in doctor
            doctor.appointments.push(appointment._id);
            await doctor.save();

            return res.status(201).send(appointment);
        }else{
            throw new Error("Failed to create Appointment");
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

exports.updateAppointment = async (req, res) => {

    try{
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment Record doesn't exist"
            })
        }

        appointment.date = req.body.date != undefined ? req.body.date : appointment.date;
        appointment.cost = req.body.cost != undefined ? req.body.cost : appointment.cost;
        appointment.status = req.body.status != undefined ? req.body.status : appointment.status;
        appointment.identifiedSymptoms = req.body.identifiedSymptoms != undefined ? req.body.identifiedSymptoms : appointment.identifiedSymptoms;
    
        const updatedAppointment = await appointment.save();

        return res.status(200).send(updatedAppointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getAllAppointments = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};
        
        if(user.userType == constants.userType.admin){
            queryObj.userId = req.query.patientId;
        }else{
            queryObj.userId = req.userId;
        }

        const appointments = await Appointment.find(queryObj);

        return res.status(200).send(appointments);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getOneAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        res.status(200).send(appointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment doesn't exist"
            })
        }

        await Appointment.deleteOne({
            _id: req.params.id
        });

        const patient = await User.findOne({
            _id: appointment.patientId
        });
        const doctor = await User.findOne({
            _id: appointment.doctorId
        });
        
        let removableIndex = patient.appointments.indexOf(appointment._id);
        if (removableIndex > -1) {
            patient.appointments.splice(removableIndex, 1);
        }
        removableIndex = doctor.appointments.indexOf(appointment._id);
        if (removableIndex > -1) {
            doctor.appointments.splice(removableIndex, 1);
        }

        await patient.save();
        await doctor.save();

        res.status(200).send({
            message: "Appointment deleted successfully"
        });

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}