

// i wll have the logic to transform the object

exports.userResponse = (users) => {
    this.userResponse = [];

users.foreach(user => {
    this.userResponse.push({
        name: user.name,
        userId: user.userId,
        email: user.email,
        address: user.address,
        userType: user.userType
    });
})

return this.userResponse

};