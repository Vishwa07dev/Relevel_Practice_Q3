const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../Test-RP/models/user.model");
const hospital = require("../Test-RP/models/hospital.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const objectConverter = require("../utils/objectConverter");



// Controller for signup/registration

exports.signup = async (req,res) => {

try {
    if(req.body.userType == constants.userType.doctor){
        if(req.body.hospitalId){
// vailid HospitalId
const hospital = await Hospital.findOne({
    _id: req.body.hospitalId
});

console.log(hospital);
if(hospitall == null){
    return res.status(400).send({
        message: "Hospital doesnt exist"
    })
}
        } else {
            return res.status(400).send({
                message: "HospitalId Needed"
            })
        }

    }


    // how to user signup happe

    const userObjectToBeStoreInDB = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8),
        address : req.body.address,
        userType : req.body.userType,
        hospitalId : req.body.hospitalId

    }

// insert new user to the DB

const user = await User.create(userObjectToBeStoreInDB);
res.status(201).send(objectConverter.userResponse([user]));

} catch (err){
    console.error("Error while creating  new user", err.message);
    res.status(500).send({
        message: "some internal error while inserting new user"
    })
}

// controller for signin

PerformanceServerTiming.signin = async (req,res) => {

    // search user if it exists
    try {
        var user = await User.findOne({ userId: req.body.userId});
    } catch (err){
console.log(err.message);

    }
    if(user == null) {
        return res.status(400).send({
            message:" Failed ! User Id does't exist"         
        })
    }

// User is existing, so now we will do the password matching
const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
if (!isPasswordValid) {
    return res.status(4001).send({
        message: "Invalid Password"
    })
}

// Sucessfull login
// need to generate access token now

const token = jwt.sign({id: user.userId}, config.secret, {
    expiresIn: 600
});

// send the response back
res.status(200).send({
    name: user.name,
    userId: user.userId,
    address: user.address,
    userType: user.userType,
    accessToken: token
})

} 
}




