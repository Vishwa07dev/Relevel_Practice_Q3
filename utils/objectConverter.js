/**
 * I will have the logic to transform the object
 */

exports.userResponse = (users) => {
    usersResponse = [];

    // return only neccessary details
    users.forEach(user => {
        usersResponse.push({
            _id: user._id,
            name: user.name,
            userId: user.userId,
            email: user.email,
            address: user.address,
            userType: user.userType
        });
    })

    return usersResponse
}