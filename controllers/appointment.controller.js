const Appointment = require('../models/appointment.model');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const constants = require('../utils/constants');

exports.bookAppointment = async (req, res) => {
    
    const new_appointment = {
        hospital_id: req.body.hospital_id,
        patient_id: req.body.patient_id,
        doctor_id: req.body.doctor_id,
        patient_symptoms: req.body.symptoms
    };
    try{
        const booked_appointment = await Appointment.create({ new_appointment });
        
        const updated_hospital = await Hospital.findOneAndUpdate({"_id": hospital_id}, {
            $push: {
                "appointments_booked": booked_appointment._id
            }
        });
        
        const updated_doctor = await User.findOneAndUpdate({"_id": doctor_id}, {
            $push: { "appointments_attended": booked_appointment._id }
        });

        const updated_patient = await User.findOneAndUpdate({"_id": patient_id}, {
            $push: { "appointments_booked": booked_appointment._id }
        });
        
        return res.status(201).send({
            message: "Appointment booked",
            output: booked_appointment
        });
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
}

exports.cancelAppointment = async (req, res) => {
    
    const appointment_id = req.params.appnt_id;
    const hospital_id = req.body.hospital_id;
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;

    try{

        const appnt = await Appointment.findOne({"_id": appointment_id});
        if(appnt && appnt.status == constants.appointment_status.confirmed) {

            const dlt_from_hospital_rec = await Hospital.updateOne({"_id": hospital_id}, {
                $pullAll: {
                    "appointments_booked": { appointment_id }
                }            
            });
    
            const dlt_from_doctor_rec = await User.updateOne({"_id": doctor_id}, {
                $pullAll: {
                    "appointments_attended": { appointment_id }
                }            
            });
    
            const dlt_from_patient_rec = await User.updateOne({"_id": patient_id}, {
                $pullAll: {
                    "appointments_booked": { appointment_id }
                }            
            });
            
            const appointment_deleted = await Appointment.findOneAndDelete({"_id": appointment_id});
    
            return res.status(200).send({
                message: "Cancelled appointment successfully",
                output: [dlt_from_hospital, appointment_deleted]
            });
        } else {
            return res.status(401).send({
                message: "Appointment is cancelled already"
            });
        }
    } catch(err) {
        console.log("Error while cancelling appnt: ", err.message);
        return res.status(500).send({
            message: err.message
        });
    }
}