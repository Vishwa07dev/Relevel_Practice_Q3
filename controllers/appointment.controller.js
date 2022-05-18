/**
 * THis file will contain logic for doctor appointment
 */


const User = require('../models/user.model');
// const Doctor = require('../models/doctor.model');
const Appointment = require('../models/appointment.model');
// logic for getting appointment

exports.createAppointment =  (req, res,)=>{

    const userId = req.userId;
    try{
        const doctor = User.find({userId : req.body.docId});
        
       if(!doctor){
        console.error('Doctor not found!');
        return res.status(400).send({
            message : "Doctor Not found!!"
        });
       }

        const user = User.find({ userId : req.userId});            
        
        const appointmentObjToBeStoredInDb = {
            docId : req.body.docId, 
            patientId : req.body.patientId,
            hospital : req.body.hospitalId,
            timing : req.body.timing, 
        };


        const appointment = await Appointment.create(appointmentObjToBeStoredInDb);
        user.appointments.push(appointment._id);
        doctor.appointments.push(appointment._id);


        return res.status(201).send({
            message : "Appointment is made!!"
        });
      } catch(err){
         console.log(err);

         return res.status(400).send({
            message : "Some error occured!!"
        });
    }
}


//logic to delete appointment

