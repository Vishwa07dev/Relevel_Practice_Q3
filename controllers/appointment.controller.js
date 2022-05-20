const Appointment = require("../models/appointment.model");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * Patient will take appointment from doctor in corresponding hospital
 */
exports.takeAppointment = async (req, res) => {

    try {
        const user = await User.findOne({
            userId: req.userId
        });
        const doctor = await User.findOne({
            _id: req.body.doctorId
        });

        // check whether doctor is valid or not
        if(doctor == null){
            return res.status(400).send({
                message: "Invalid doctor Id"
            })
        }

        const hospital = await Hospital.findOne({
            _id: req.body.hospitalId
        });

        // check whether hospital is valid or not
        if (hospital == null) {
            return res.status(400).send({
                message: "Hospital doesn't exist"
            })
        }

        // Appointment object to be stored in database
        const appointmentObj = {
            patientId: user._id,
            hospitalId: req.body.hospitalId,
            doctorId: req.body.doctorId,
            date: req.body.date,
            cost: req.body.cost,
            identifiedSymptoms: req.body.identifiedSymptoms,
            prescription: ""
        }

        // save appointment object into database using appointment model
        const appointment = await Appointment.create(appointmentObj);

        if(appointment){
            // update appointment inside patient object
            user.patientAppointments.push(appointment._id);
            const updatedUser = await user.save();

            // update appointment inside doctor object
            doctor.doctorAppointments.push(appointment._id);
            await doctor.save();

            // return created appointment
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

/**
 * PATIENT OR respected DOCTOR or ADMIN can update appointment details
 */
exports.updateAppointment = async (req, res) => {

    try{
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        // check whether appointment exists or not
        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment Record doesn't exist"
            })
        }

        // update respective appointment details from req body
        appointment.date = req.body.date != undefined ? req.body.date : appointment.date;
        appointment.cost = req.body.cost != undefined ? req.body.cost : appointment.cost;
        appointment.status = req.body.status != undefined ? req.body.status : appointment.status;
        appointment.identifiedSymptoms = req.body.identifiedSymptoms != undefined ? req.body.identifiedSymptoms : appointment.identifiedSymptoms;
        
        // save the update appointment into database 
        const updatedAppointment = await appointment.save();

        // return updated appointment
        return res.status(200).send(updatedAppointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * ADMIN can get all appointments
 * DOCTOR 
 *  - Can get apppoitments where he/she is PATIENT
 *  - Can get apppoitments where he/she is DOCTOR
 *  - Can get apppoitments where he/she is DOCTOR OR PATIENT
 * PATIENT will get all appointments booked by him/her.
 */
exports.getAllAppointments = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};
        
        // PATIENT will get all appointments
        if(user.userType == constants.userType.patient){
            queryObj.patientId = user._id;
        }else if(user.userType == constants.userType.doctor){
            // DOCTOR Can get apppoitments where he/she is PATIENT
            if(req.query.role == constants.userType.patient){
                queryObj.patientId = user._id;
            }
            // DOCTOR Can get apppoitments where he/she is DOCTOR
            else if(req.query.role == constants.userType.doctor){
                queryObj.doctorId = user._id;
            }else{
                // DOCTOR Can get apppoitments where he/she is DOCTOR OR PATIENT
                queryObj.$or = [ 
                    { patientId: user._id },
                    { doctorId: user._id }    
                ];
            }
        }

        // GET appointments based on query object
        const appointments = await Appointment.find(queryObj);

        // return corresponding appointments found in database
        return res.status(200).send(appointments);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * GET Single appointment based on its id
 */
exports.getOneAppointment = async (req, res) => {
    try{
        // get appointment based on id from database
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        // return found appointment
        res.status(200).send(appointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

/**
 * Valid User cannot delete appointment, it can only be cancelled
 */
exports.cancelAppointment = async (req, res) => {
    try {
        // get appointment based on id from database
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        // check if appointment is valid or not
        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment doesn't exist"
            })
        }

        // update cancel status and save
        appointment.status = constants.appointmentStatus.cancel;
        const updatedAppointment = await appointment.save();

        // return updated or cancelled appointment
        res.status(200).send(updatedAppointment);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}