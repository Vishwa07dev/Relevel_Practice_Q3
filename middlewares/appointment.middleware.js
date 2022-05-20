const Appointment = require("../models/appointment.model");
const Hospital = require("../models/hospital.model");
const constants = require("../utils/constants");

const User = require("../models/user.model");

isValidPatient = async (req, res, next) => {

    const user = await User.find({userId: req.userId});

    if(user._id != req.body.patient_id) {
        return res.status(403).send({
            message: "your are not an owner to do this operation"
        });
    }
    next();
}

isValidHospitalAndDoctor = async (req, res, next) => {
    
    const isValidHospital = await Hospital.find({
        _id: req.body.hospital_id
    });

    if(!isValidHospital) {
        return res.status(404).send({
            message: "Hospital not found for the given hospital_id"
        });
    }
    if(!isValidHospital.doctor_ids.includes(req.body.doctor_id)) {
        return res.status(404).send({
            message: "Doctor not found for the given hospital_id"
        });
    }
    next();

}
checkFields = async (req, res, next) => {
     if(!req.body.patient_id) {
        return res.status(400).send({
            message: "Failed ! patient_id is not provided"
        });
    }
     if(!req.body.hospital_id) {
        return res.status(400).send({
            message: "Failed ! hospital_id is not provided"
        });
    }
     if(!req.body.doctor_id) {
        return res.status(400).send({
            message: "Failed ! doctor_id is not provided"
        });
    }
     if(!req.body.healthTrackRecordId) {
        return res.status(400).send({
            message: "Failed ! healthTrackRecordId is not provided"
        });
    }
     if(!req.body.appointmentScheduledTime) {
        return res.status(400).send({
            message: "Failed ! appointmentScheduledTime is not provided"
        });
    }
    next();
      
}

isValidDoctor = async (req, res, next) => {

    const user = await User.find({userId: req.userId});

    const isValidDoctor = user._id;
    const appointment = await Appointment.find({_id: req.params._id});

    const appointmentDoctorId = appointment.doctor_id;
    const appointmentHospitalId = appointment.hospital_id;

    if(!(user.type == constants.types.doctor && 
        isValidDoctor == appointmentDoctorId &&
        appointmentHospitalId.doctor_ids.includes(isValidDoctor))) {
        
            return res.status(403).send({
                message: "Only appointed doctor is allowed to give prescription"
            });
    }
    next();

}
const authAppointment = {
  isValidPatient: isValidPatient,
  isValidHospitalAndDoctor: isValidHospitalAndDoctor,
  checkFields: checkFields,
  isValidDoctor: isValidDoctor,
};


module.exports = authAppointment;