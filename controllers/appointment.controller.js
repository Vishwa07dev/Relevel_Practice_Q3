const Appointment = require('../models/appointment.model');
const Hospital = require('../models/hospital.model');

exports.bookAppointment = async (req, res) => {
    
    const new_appointment = {
        hospital_id: req.body.hospital_id,
        hospital_name: req.body.hospital_name,
        patient_symptoms: req.body.symptoms
    };
    try{
        const booked_appointment = await Appointment.create({ new_appointment });
        const added_appointment = await Hospital.findOneAndUpdate({"name": hospital_name}, {
            $push: {
                "appointments_booked": booked_appointment._id
            }
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

exports.deleteAppointment = async (req, res) => {
    
    const appointment_id = req.params.appnt_id;
    const hospital_id = req.body.hosp_id;
    try{
        const dlt_from_hospital = await Hospital.updateOne({"_id": hospital_id}, {
            $pullAll: {
                "appointments_booked": { appointment_id }
            }            
        });
        
        const appointment_deleted = await Appointment.findOneAndDelete({"_id": appointment_id});

        return res.status(200).send({
            message: "Deleted appointment successfully",
            output: [dlt_from_hospital, appointment_deleted]
        });
    } catch(err) {
        console.log("Error while deleting appnt: ", err.message);
        return res.status(500).send({
            message: err.message
        })
    }
}