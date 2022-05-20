

// logic for docter appointment

// const doctor = require ("..mdels/doctor.model")
const user = require("../models/user.model");

// logic for getting appointment
const appointment = require("../models/appointment.model");

exports.createAppointment = (req,res) => {
    const userId = req.userId;

try{

    const doctor = User.find({userId : req.body.docId});

    if(!doctor){
        console.error('Doctor not found');
        return res.status(400).send({
            message: "Doctor not found!!"
        });
    }

    const user = User.find({userId: req.userId});
    
    const appointment = await appointment.create(appointObjectToBeStoreInDB);
user.appointment.push(appointment._id);
doctor.appointment.push(appointment._id)    

return res.status(201).send({
    message: "Appointment is made!!"
});

}catch (err){
    console.log(err);

    return res.status(400).send({
        message: "Some error occured!!"

    })
}
}