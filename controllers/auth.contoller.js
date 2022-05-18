const objectConverter = require("../utils/objectConverter");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const Hospital = require("../models/hospital.model")

exports.signup = async (req, res) => {
    
    const userObjToBeStoredInDB = {
        name : req.body.name,
        userId : req.body.userId,
        address : req.body.address,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8)
    }

    const hospitalId = req.body.hospital_id;
    let hospital;
    try {
    if(hospitalId) {
        hospital = await Hospital.find({hospitalId});
    }
    if(hospital == null || hospital.length == 0) {
        return res.status(404).send({
            success: false,
            message: "No hospital found for the given id, please provide valid hospital_id"
        });
    }
    userObjToBeStoredInDB.hospital_Id = hospitalId;
    const userCreated = await User.create(userObjToBeStoredInDB);

    console.log("user created ", userCreated);


    res.status(201).send(objectConverter.userCreationObject(userCreated));
} catch(err){
    console.error("Error while creating new user", err.message);
    res.status(500).send({
        message : "some internal error while inserting new user"
    })
}

}

exports.signin = async (req, res) =>{
  
    try{
    var user =  await User.findOne({userId : req.body.userId});
    
    }catch(err){
        console.log(err.message);
    }
    if(user == null){
       return res.status(400).send({
            message : "Failed ! User id doesn't exist"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    
    if(!isPasswordValid){
       res.status(200).send(objectConverter.userSigninObject(user));
    }

  
    const token = jwt.sign({id: user.userId}, config.secret,{
        expiresIn : 600
    });
    user.token = token;
    res.status(200).send({
       
    })
    
};

