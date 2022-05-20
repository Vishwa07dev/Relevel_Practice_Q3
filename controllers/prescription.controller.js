const Prescription = require("../models/prescription.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");

exports.createPrescription = async()=>{

    const prescriptionObj = {
        medicines: req.body.medicines,
        nextAppointment: req.body.nextAppointment,
        userId:[],
        doctor_id: []
    }

    try {
        const doctor = await User.findOne({
            userType: constants.userTypes.doctor   
        });

        const prescription = await Prescription.create(prescriptionObj);
        console.log(prescription);

        if (prescription) {
            const user = await User.findOne({
                userId: req.userId
            })
            user.prescriptionCreated.push(prescription._id);
            await user.save();

      return res.status(200).send({
          message: "Prescription  created successfully"
      });
    }
      
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }


};
exports.getAllPrescription = async(req, res)=>{
    try {
        const prescription= await Prescription.find();
        return res.status(200).send(prescription)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
    
};

exports.getOnePrescription= async (req, res) => {
    try{
            
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });

        res.status(200).send(prescription);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
};

exports.updatePrescription= async (req, res) => {

    try{
        const prescription = await Prescription.findOne({
            _id: req.params.id
        });
    
        console.log(prescription);
    
        if (prescription == null) {
            return res.status(400).send({
                message: "Prescription doesn't exist"
            })
        }
    
       prescription.medicines = req.body.medicines != undefined ? req.body.medicines: prescription.medicines;
       prescription.nextAppointment = req.body.nextAppointment != undefined ? req.body.nextAppointment : prescription.nextAppointment;
    
        
    
    
        const updatedPrescription = await prescription.save();
    
    
    
        return res.status(200).send(updatedPrescription);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
    
}

exports.deletePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.deleteOne({
            _id: req.params.id
        });    
        res.status(200).send({
            message : "succesfully deleted Prescription"
        });
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    }
};
