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

exports.appointmentResponse = (appointment) => {
    return {
        visit_Date: appointment.visit_Date,
        time: appointment.time,
        doctor_Id: appointment.doctor_Id,
        hospitalId: appointment.hospitalId,
        symptoms: appointment.symptoms,
        id: appointment._id,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt
    }
};
