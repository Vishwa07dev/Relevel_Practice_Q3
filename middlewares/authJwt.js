const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

/**
 * Authentication -- If token passed is valid or not
 *
 * 1. If no token is passed in the request header - Not Allowed
 * 2. If token is passed: Authenticated
 *          if correct allow, else reject
 */

verifyToken = (req, res, next) => {
    // read the token from the header
    const token = req.headers['x-access-token'];
    // if no token provided
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    // if token is provided
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorised"
            });
        }
        // I will read the userId from the decoded token and and it in req object
        req.userId = decoded.id;
        next();
    })
};





module.exports = {verifyToken:verifyToken};
