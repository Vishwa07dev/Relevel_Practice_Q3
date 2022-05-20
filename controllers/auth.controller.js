const bcrypt = require("bcryptjs");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config =  require("../configs/auth.config");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");
//const authConfig = require("../configs/auth.config");

/**
 * Controller for signup/registration
 */

exports.signup = async(req, res) =>{
    
 try{
    if(req.body.userTypes == constants.userTypes.doctor){
        if(req.body.hospitalId){
            //Validate hospitalid
            const hospital = await Hospital.findOne({
                _id : req.body.hospitalId
            });
            console.log(hospital);
            if(hospital == null){
                return res.status(400).send({
                    message: "Hospital doesn't exist"
                })
            }
        }else{
            return res.status(400).send({
                message: "HospitalId id needed"
            })
        }
    
        
        //How the user sign up will happen
        const userObjToBeStoredInDB = {
            name: req.body.name,
            userId: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 8),
            address: req.body.address,
            userType: req.body.userType,
            hospitalId: req.body.hospitalId,
            healthTrackRecords: []
        }
        /**
         * Insert this new user to the db
         */


    // How the user signup will happen?

    const userObjToBeStoredInDB = {
        name : req.body.name,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        address : req.body.address,
        userType: req.body.userType,
        hospitalId: req.body.hospitalId

    }
    // Insert this new user to the DB.

    const user = await User.create(userObjToBeStoredInDB);
    res.status(201).send(objectConverter.userResponse([user]));
}catch(err){
    console.error("Error while creating new user", err.message);
    res.status(500).send({
        message: "Some internal error while inserting new user "
    })
 }

};

/**
 * controller for Signin. 
 */
exports.signin = async(req, res)=>{
    //1. we will search user is exists or not.

    try{
        var user = await User.findOne({userId: req.body.userId});
    }catch(err){
        console.log(err.message);
    }
    if(user == null){
        return res.status(400).send({
            message: "Failed! Userid doesn't exist"
        });
    }

    // 2. User is existing, so now we can do the password matching.
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid){
        return res.status(401).send({
            message: "Password is Invalid. "
        })
    }

  /**
   * 3. Successfull login  
   * - I need to generate access token now.
   **/ 
  const token = jwt.sign({id: user.userId }, config.secret, {
      expiresIn: 600
  });

  // 4. Send the response back.
  res.status(200).send({
      name: user.name,
      userId: user.userId,
      address: user.address,
      userType: user.userType,
      accessToken: token
  });
};