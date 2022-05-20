const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Constants = require("../utils/constants");

validateSignupRequest = async (req, res, next) => {
   
    if(!req.body.name) {
        return res.status(400).send({
            message: "Failed ! user name is not provided"
        });
    }
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        });
    }
    if(!req.body.address) {
        return res.status(400).send({
            message: "Failed ! Address is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        });
    }

    const user = await User.findOne({userId: req.body.userId});
    console.log(user);
    if(user != null) {
        return res.status(400).send({
            message: "Failed ! User Id already exists"
        });
    }
   
    next(); 
}

validateSignInRequest = (req, res, next) => {
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! name is not provided"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! password is not provided"
        });
    }
    next();
}

isOwner = async (req, res, next) => {
    
    const user = await User.find({userId: req.userId});

    if(user._id != req.body.user_id) {
        return res.status(403).send({
            message: "your are not an owner to create the health track record"
        });
    }
    next();
}



verifyToken = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    console.log("token >>", token);
    //! If the token was provided, we need to verify it against
    jwt.verify(token, Config.secret, (err, decoded) =>{
        if(err) {
            console.log("Token expiredAt", err.expiredAt);
            return res.status(401).send({
                message: "Token expired at " + err.expiredAt + ", please create new token"
            });
        } 
        //! I will try to read the userId from the decoded token and store it in the req.userId property
        req.userId = decoded.id;
        next();
    });
}

isAdmin = async (req, res, next) => {
    /**
     * Fetch user from the DB using req.userId
     */
    const user = await User.findOne({userId: req.userId});

    /**
     * Check the userType
     */
    if(!user) {
         return res.status(403).send({
            message: "No user Found"
        });
    }
    else if(user && user.type == Constants.types.admin)
        next();
    else {
        return res.status(403).send({
            message: "Requires ADMIN Role"
        });
    }
}

isAdminOrOwner = async (req, res, next) => {

    const user = await User.find({userId: req.userId});

    if(user.type != Constants.types.admin || !user.healthRecords.includes(req.params.id)) {
        return res.status(403).send({
            message : "only owner or admin are allowed to do this operation"
        });
    }
    next();
}

const auth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAdminOrOwner: isAdminOrOwner,
    validateSignupRequest: validateSignupRequest,
    validateSignInRequest: validateSignInRequest,
    // isValidPatient: isValidPatient,
    isOwner: isOwner
};


module.exports = auth;