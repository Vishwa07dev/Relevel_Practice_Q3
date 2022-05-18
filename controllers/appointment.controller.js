const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const Appointmet = require('../models/appointment.model');

exports.addAppointment = async (req, res) => {

    const appointmentObj = {
        userId : req.body.userId,
        doctorId : req.body._id,
        date : req.body.date
    }

    try{
        const doctor = await User.findOne({_id : req.body._id});

        const appointmet = await User.create(appointmentObj);

        if(appointmet){
            //adding the appointment to patient
            const user = await user.find({userId : req.body.userId})
            user.appointmentCreated.push(appointmet._id)
            await user.save();
            
            //adding appointment assigned to doctor
            doctor.appointmentAssigned.push(appointmet._id)
            await user.save();
            
            return res.status(200).send(appointmet)
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

exports.updateAppointment = async (req, res) => {

    try{
        const appointment = await Appointmet.findOne({
            _id: req.params.id
        });

        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment Record doesn't exist"
            })
        }

        //as doctor is the only thing a patient can change about the appointment 
        appointment.doctorId = req.body.doctorId != undefined ? req.body.doctorId : appointment.doctorId;
        appointment.date = req.body.date != undefined ? req.body.date : appointment.date;

        const updatedRecord = await appointment.save();

        return res.status(200).send(updatedRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getAllAppointment = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        const appointment = await Appointmet.find({userId : user.userId})

        return res.status(200).send(appointment);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}



exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.deleteOne({
            _id: req.params.id
        });    

        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment Record doesn't exist"
            })
        }

        const user = await User.findOne({
            userId: req.userId
        });
        
        let removableIndex = user.appointment.indexOf(healthTrackRecord._id);
        if (removableIndex > -1) {
            user.appointment.splice(removableIndex, 1);
        }
        
        await user.save();
        
        res.status(200).send({
            message : "Appointment Deleted Succefully"
        });

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}