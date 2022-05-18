const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const constants = require("../utils/constants");


/**
 * Authentication
 * 
 *     - If the token passed is valid or no
 * 
 * 
 * 1. If no token is passed in the request header - Not Allowed
 * 2. If token is passed : AUthenticated
 *       if correct allow, else reject 
 */

verifyToken = (req,res, next) =>{
    /**
     * Read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        })
    }

    //If the token was provided, we need to verify it
    jwt.verify(token,config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        //I will try to read the userId from the decoded token and store it in req object
        req.userId = decoded.id;
        next();
    } )

};

/**
 * If the passed access token is of ADMIN or not
 */

isAdmin = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && user.userType == constants.userType.admin){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN role"
        })
    }
}

isPatient = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && user.userType == constants.userType.patient){
        next();
    }else{
        res.status(403).send({
            message: "Requires PATIENT role"
        })
    }
}

isDoctor = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId : req.userId});

    /**
     * Check what is the user type
     */
    if(user && user.userType == constants.userType.doctor){
        next();
    }else{
        res.status(403).send({
            message: "Requires DOCTOR role"
        })
    }
}

isOwnerOfAppointment = async (req,res, next) =>{
    try {
        const user = await User.findOne({
            userId: req.userId
        });
        
        const appointment = await Appointment.findOne({
            _id: req.params.id
        });

        if(appointment == null){
            return res.status(400).send({
                message: "Appointment doesn't exist"
            })
        }

        // console.log(user._id.valueOf());
        if(user.userType == constants.userType.patient){
            // console.log(appointment.patientId, user);
            if(appointment.patientId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the OWNER has access to this"
                })
            }
        }
        if(user.userType == constants.userType.doctor){
            if(appointment.doctorId.valueOf() != user._id.valueOf()){
                return res.status(400).send({
                    message: "Only the OWNER has access to this"
                })
            }
        }
        
        next();
    } catch (err) {
        // console.log("verifyAddRecord", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isPatient: isPatient,
    isDoctor: isDoctor,
    isOwnerOfAppointment: isOwnerOfAppointment
};
module.exports= authJwt;