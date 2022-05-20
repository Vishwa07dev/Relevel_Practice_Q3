const Appointment = require("../models/appointment.model");

exports.createAppointment = async(req, res)=>{
    const appointmentObj = {
        appointmentDate : req.body.appointmentDate,
        appointmentTime : req.body.appointmentTime,
        symptoms: req.body.symptoms,
        userId: [],
        doctor_id: [],
        hospitalId: []
    }

    try{
        const appointment = await Appointment.create(appointmentObj);
        console.log(appointment);

        return res.status(201).send(appointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "some internal server error"
        })
    }
    
};

exports.getAllAppointment = async(req, res)=>{
    try {
        const appointment = await Appointment.find();
        return res.status(200).send(appointment)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
    
};

exports.getOneAppointment = async (req, res) => {
    try{
            
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        res.status(200).send(appointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
};

exports.updateAppointment = async (req, res) => {

    try{
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });
    
        console.log(appointment);
    
        if (appointment == null) {
            return res.status(400).send({
                message: "Appointment doesn't exist"
            })
        }
    
        appointment.appointmentDate = req.body.appointmentDate != undefined ? req.body.appointmentDate : appointment.appointmentDate;
        appointment.appointmentTime = req.body.appointmentTime != undefined ? req.body.appointmentTime : appointment.appointmentTime;
        appointment.symptoms = req.body.symptoms != undefined ? req.body.symptoms: appointment.symptoms;
        
    
    
        const updatedAppointment = await appointment.save();
    
    
    
        return res.status(200).send(updatedAppointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
    
}

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.deleteOne({
            _id: req.params.id
        });    
        res.status(200).send({
            message : "succesfully deleted appointment."
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
};

