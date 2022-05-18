const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const objectConverter = require("../utils/objectConverter");


/**
 * signup/registration
 */
exports.signup = async (req, res) => {

    try {
        if(req.body.userType == constants.userType.doctor){
            if(req.body.hospitalId){
                // validate hospitalId
                const hospital = await Hospital.findOne({
                    _id: req.body.hospitalId
                });

                console.log(hospital);
                if(hospital == null){
                    return res.status(400).send({
                        message: "Hospital Doesnt Exist"
                    })
                }
            }else{
                return res.status(400).send({
                    message: "HospitalId Needed"
                })
            }
        }
        
        //How the user sign up will happen
        const userObjToBeStoredInDB = {
            name: req.body.name,
            userId: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 8),
            address: req.body.address,
            userType: req.body.userType,
            hospitalId: req.body.hospitalId,
        }
        /**
         * Insert this new user to the db
         */

        const user = await User.create(userObjToBeStoredInDB);

        res.status(201).send(objectConverter.userResponse([user]));
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "some internal error while inserting new user"
        })
    }

}


/**
 *  signin
 */
exports.signin = async (req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ userId: req.body.userId });
    } catch (err) {
        console.log(err.message);
    }
    if (user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        })
    }

    //User is existing, so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        })
    }

    //** Successfull login */
    //I need to generate access token now
    const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 600
    });

    //Send the response back
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        address: user.address,
        userType: user.userType,
        accessToken: token
    });

};