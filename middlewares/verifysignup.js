const User = require("../models/user.model");
const constants = require("../utils/constants");

validateSignupRequest = async(req, res)=>{
    //Validate if username exists
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! User name is not provided. "
        })
    }

    //validate if the userid exists.

    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed! User id is not provided"
        })
    }
    /**
     * Validate if the userId is already not present
     */
    const user = await User.findOne({userId: req.body.userId});

    if(user!=null){
        return res.status(400).send({
            message: "Failed! UserId already exist. "
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message: "Failed! password is not provided. "
        })
    }
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.patient, constants.userTypes.admin, constants.userTypes.doctor];
    if(userType && !userTypes.includes(userType)){
        return res.status(400).send({
            message: "Failed! userType is not correctly provided. "
        })
    }
    next();
};

module.exports = {
    validateSignupRequest : this.validateSignupRequest
};
