const appntCtrl = require('../controllers/appointment.controller');
const auth = require('../middlewares/authjwt');

module.exports = (app) => {
    // for booking appointment
    // POST - /getfit/api/v1/appointments
    app.post("/getfit/api/v1/appointments", [auth.isAdmin, auth.isPatient], appntCtrl.bookAppointment);

    // for deleting appointment
    // POST - /getfit/api/v1/appointments
    app.post("/getfit/api/v1/appointments/:appnt_id", [auth.isAdmin, auth.isPatient], appntCtrl.deleteAppointment);
}