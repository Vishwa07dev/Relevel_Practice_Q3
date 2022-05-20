const objectConverter = require("../utils/objectConverter");
const HealthTrackRecord = require("../models/healthTrackRecord.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const Appointment = require('../models/appointment.model');
const Hospital = require('../models/hospital.model');

//adding the appointment
exports.addAppointment = async (req, res) => {

  

    try{
        //getting the user who is looged in 
        const user = await User.findOne({userId : req.userId});

        //Getting a doctor id from response body
        const doctor = await User.findOne({_id : req.body.doctorId});

        //checking is doctor exsit
        if(doctor == null){
            return res.status(400).send({
                message : "Doctor does not exsist please enter valid doctor id"
            })
        };

        //Getting a hospital id from response body
        const hospital = await Hospital.findOne({_id : req.body.hospital_ids});

        //checking is hospital exsit
        if(hospital == null){
            return res.status(400).send({
                message : "Hospital does not exsist please enter valid hospital id"
            })
        };

        //checking if the doctor is working in the hospital provided by user
        if(JSON.stringify(hospital.doctor_ids) == JSON.stringify(doctor.hospitalId)){
            return res.status(400).send({
                message : "Doctor does not work in the hospital id provided"
            })
        };

        const appointmentObj = {
            userId : user._id,
            doctorId : req.body.doctorId,
            hospital_ids : req.body.hospital_ids,
            symptons : req.body.symptons,
            medications : req.body.medications,
            date : req.body.date
        }

        //creating appointment with the appointmentObj
        const appointment = await Appointment.create(appointmentObj);

        if(appointment){

            //adding the appointment to patient
            user.appointmentCreated.push(appointment._id)
            await user.save();
            
            //adding appointment assigned to doctor
            doctor.appointmentAssigned.push(appointment._id)
            await user.save();
            
        }
        return res.status(200).send(appointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

}

/**
 *  This api is mainly used by Doctor or Admin for:
 *      1.to Update Status
 *      2. to Add,update,delete appointment
 * 
 *  This api can also be used by patient to make changes to the appointment
 */
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
        const user = await User.findOne({
            userId: req.userId
        });
        /**
         *  Once a appointment is created for a doctor and hospital patient cannot change doctor/hospital if he want he can cancel the appointment and create for the other doctor/hospital he want 
         * 
         * 
         */

        appointment.symptons = req.body.symptons != undefined ? req.body.symptons : appointment.symptons;
        appointment.medications = req.body.medications != undefined ? req.body.medications : appointment.medications;
        appointment.date = req.body.date != undefined ? req.body.date : appointment.date;
       
        /**
         *  1. Doctor or Admin can change the status of the Appointment
         *  2. Doctor or admin can also change , update, write prescription to the patient  
         */ 
        if(user.userType == constants.userType.admin || user.userType == constants.userType.doctor){
            appointment.prescription = req.body.prescription != undefined ? req.body.prescription : appointment.prescription;
            appointment.status = req.body.status != undefined ? req.body.status : appointment.status;
            
            await appointment.save();
        }

        const updatedRecord = await appointment.save();

        return res.status(200).send(updatedRecord);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

//fetching the appointment based on usertype 
exports.getAllAppointment = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });
        //admin will have access to all the appointment
        if(user.userType == constants.userType.admin){
            const appointment = await Appointment.find();
            return res.status(200).send(appointment);
        }else{
            const appointment = await Appointment.find({userId : req.userId});
            return res.status(200).send(appointment);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

//fetching appointment based on id 
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

