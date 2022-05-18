const User = require("../models/user.model");
const constant = require("../utils/constants");


validateSignupRequest = async (req,res, next) =>{
    //Validate if userName exists
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed !  User name is not provided"
        })
    }

    //Validate if the userId exists
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed !  User Id is not provided"
        })
    }

    /**
     * Valiate if the userIs is already not preset
     */
    const user = await User.findOne({userId : req.body.userId});

    if(user!=null){
        return res.status(400).send({
            message : "Failed !  User Id already exist"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed !  User password is not provided"
        })
    }

   
    const userType = req.body.userType ;
    const userTypes = [ constant.userTypes.patient , constant.userTypes.admin, constant.userTypes.doctor]
    if(userType && !userTypes.includes(userType)){
        return res.status(400).send({
            message : "Failed !  User type is not correctly provided"
        })
    }
    
  
    next(); // give the controll to the controller

}

module.exports = {
    validateSignUpRequest : validateSignupRequest
};