/**
 * This file will contain the custom middleware for verifying the request body
 */
const User = require("../models/user.model");


validateSignupRequest = async (req, res, next)=>{
    // validate if user name is present
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! user name is not provided"
        })
    }
    // *validate if userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed! userId is not provided"
        })
    }
    // ** validate if userId is already not present
    const userid = await User.findOne({userId: req.body.userId});

    if(userid != null){
        return res.status(400).send({
            message: "Failed! userId is already exists"
        })
    }
  
    // *validate if email is present
    if(!req.body.address){
        return res.status(400).send({
            message: "Failed! address is not provided"
        })
    }
    
   
    // *validate if password is provided
    if(!req.body.password){
        return res.status(400).send({
            message: "Failed! password is not provided"
        })
    }

    next(); // give the control to the controller
}

module.exports = { validateSignUpRequest: validateSignupRequest }
