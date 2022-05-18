
exports.hospitalCreationObject = (hospital) => {
       return {
        name : hospital.name,
        address: hospital.address,
       }
}

exports.userCreationObject = (userCreated) => {
       return {
       _id: userCreated._id,
        name : userCreated.name,
        userId : userCreated.userId,
        hospital_id: userCreated.hospital_id,
        address : userCreated.address,
        userType : userCreated.userType,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
}

exports.userSigninObject = (user) => {
       return {
       _id: user._id,
        name : user.name,
        userId : user.userId,
        hospital_id: user.hospital_id,
        address : user.address,
        userType : user.userType,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt,
        token: user.token
    }
}