const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

exports.findAllUsers = async (req, res) => {

    /**
     * Read the data from the query param
     */

    const nameReq = req.query.name;
    const userTypeReq = req.query.userType;
    console.log(userTypeReq);


    const mongoQueryObj = {}
    if (nameReq &&  userTypeReq) {
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userType = userTypeReq;
    } else if (nameReq) {
        mongoQueryObj.name = nameReq;
    } else if (userTypeReq) {
        mongoQueryObj.userType = userTypeReq;
    }

    console.log(mongoQueryObj);

    /**
    * Write the code here to fetch all the Users from the DB
    * 
    * Fetch the User documents from the users collection
    *
    */
    try {
        const users = await User.find(mongoQueryObj);

        return res.status(200).send(objectConverter.userResponse(users));  // user password will also be returned in response
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while fetching all users"
        })
    }
}


/**
 * Fetch the user based on the userId
 */

exports.findUserById = async (req, res) => {
    const userIdReq = req.params.userId; //Reading from the request parameter

    const user = await User.find({ userId: userIdReq });

    if (user) {
        res.status(200).send(objectConverter.userResponse(user));
    } else {
        res.status(200).send({
            message: "User with id " + userIdReq + " doesn't exist"
        })
    }


}



/**
 * Update the user - address, userType
 *
 * 
 *  name , userType, address
 *  
 */
exports.updateUser = (req, res) => {

    /**
     * One of the ways of updating
     */
    try {
        const userIdReq = req.params.userId;

        const user = User.findOneAndUpdate({
            userId: userIdReq
        }, {
            name: req.body.name,
            userType: req.body.userType,
            address: req.body.address 
        }).exec();

        res.status(200).send({
            message: "User record succesfully updated"
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal server error while updating"
        })
    }

}