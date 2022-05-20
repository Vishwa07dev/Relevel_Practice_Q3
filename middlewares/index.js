const HospitalCheckPoint = require("./hospital.middleware");
const authCheckPoint = require("./auth.middleware");
const appointmentCheckPoint = require("./appointment.middleware")

module.exports = {
    HospitalCheckPoint,
    authCheckPoint,
    appointmentCheckPoint
}
