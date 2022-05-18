const Appointment = require("../models/appointment.model");
const objectConverter = require("../utils/objectConverter");
const constant = require("../utils/constants");

exports.createAppointment = async(req, res) => {
    
    const appointmentObj = {
        visit_Date : req.body.visit_Date,
        time: req.body.time,
        symptoms: req.body.symptoms
    }
    try{
    const appointment = await Appointment.create(appointmentObj);
    console.log(appointment);

    if (appointment) {
        const user = await User.findOne({
            userId: req.userId
        })
        user.appointmentCreated.push(appointment._id);
        await user.save();
}
return res.status(201).send(objectConverter.appointmentResponse(appointment));

} catch (err) {
    console.log(err.message);
    return res.status(500).send({
        message: "Some internal error"
    })
}

};
//write logic for getAllAppointment 

exports.updateAppointment = async (req, res) => {

    try{
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        if (appointment == null) {
            return res.status(400).send({
                message: "appointment doesn't exist"
            })
        }

        appointment.visit_Date = req.body.visit_Date != undefined ? req.body.visit_Date : appointment.visit_Date;
        appointment.time = req.body.time != undefined ? req.body.time : appointment.time;
        appointment.symptoms = req.body.symptoms != undefined ? req.body.symptoms : appointment.symptoms;
    
        const updatedAppointment = await appointment.save();

        return res.status(200).send(updatedAppointment);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getAllRecords = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.userId
        });

        let queryObj = {};
        
        if(user.userType == constants.userType.doctor || user.userType == constants.userType.admin){
            queryObj.userId = req.query.patientId;
        }else{
            queryObj.userId = req.userId;
        }

        const appointment = await Appointment.find(queryObj);

        return res.status(200).send(appointment);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

exports.getOneAppointment= async (req, res) => {
    try{
            
        const appointment= await Appointment.findOne({
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
        const appointment = await Appointment.deleteOne({
            _id: req.params.id
        });    

        if(appointment == null) {
            return res.status(400).send({
                message: "appointment doesn't exist"
            })
        }

        const user = await User.findOne({
            userId: req.userId
        });
        
      

        const updatedAppointment= await user.save();
        res.status(200).send(updatedAppointment);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}