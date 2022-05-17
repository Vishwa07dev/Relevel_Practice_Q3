// this file will custom middleware for verifying the requesat body

const user = require('../models/user.model')
const constant = require('../utils/constant')

validateSignupRequest = async (req,res,next) => {

    //validate username 
    if(!req.body.name){
        return res.status(400).send({
            message : "failed ! Name is not provided"
        })
    }

    //validate userId
    if(!req.body.userId){
        return res.status(400).send({
            message : "failed ! User Id is not provided"
        })
    }

    //validate userID allready present
    const User = await user.findOne({userId: req.body.userId});
    if(User != null){
        return res.status(400).send({
            message : "failed ! User Id already exist"
        })
    }
    
    
    






    //password not provided 
    if(!req.body.password){
        return res.status(400).send({
            message : "failed ! password is not provided"
        })
    }


    const userType = req.body.userType ;
    const userTypes = [ constant.userType.patient, constant.userType.doctor, constant.userType.admin]
    if(userType && !userTypes.includes(userType)){
        return res.status(400).send({
            message : "Failed !  User type is not correctly provided"
        })
    }




    next();
} 

module.exports = {
    validateSignUpRequest : validateSignupRequest
}