/**
 * I will have the logic to transform the object
 */

exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userId: user.userId,
            address: user.address,
            userType: user.userType
        });
    })

    return usersResponse
};