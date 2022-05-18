
const appointmentController = require("../controllers/appointment.controller");
const { authJwt, verifyTrackRecord } = require("../middlewares");

module.exports = (app)=>{

    app.post("/getfit/api/v1/appointments", [authJwt.verifyToken, authJwt.isPatient], appointmentController.takeAppointment);

    // authJwt.isPatient, authJwt.isDoctor, authJwt.isAdmin,
    app.put("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, verifyTrackRecord.isOwnerOfHealthRecord], appointmentController.updateAppointment);

    app.delete("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, authJwt.isPatient, authJwt.isAdmin, verifyTrackRecord.isOwnerOfHealthRecord], appointmentController.deleteAppointment);
    
    app.get("/getfit/api/v1/appointments", [authJwt.verifyToken], appointmentController.getAllAppointments);
    
    app.get("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, verifyTrackRecord.isOwnerOfHealthRecord], appointmentController.getOneAppointment);
    
}