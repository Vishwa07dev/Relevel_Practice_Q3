const appointmentController = require("../controllers/appointment.controller");
const {authCheckPoint} = require("../middlewares");
const {appointmentCheckPoint} = require("../middlewares")


module.exports = (app)=> {
    
    
    app.post("/getfit/api/v1/appointments", [appointmentCheckPoint.checkFields, authCheckPoint.verifyToken, appointmentCheckPoint.isValidPatient, appointmentCheckPoint.isValidHospitalAndDoctor], appointmentController.createAppointment);

    app.put("/getfit/api/v1/appointments/:id", [authCheckPoint.verifyToken, appointmentCheckPoint.isValidDoctor], appointmentController.providePrescription);

    app.get("/getfit/api/v1/appointments/:id", [authCheckPoint.verifyToken], appointmentController.getPrescription);


}