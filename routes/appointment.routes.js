/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for appointment

const appointmentController = require("../controllers/appointment.controller");
const { authJwt, verifyAppointment } = require("../middlewares");

module.exports = (app)=>{

    app.post("/getfit/api/v1/appointments", [authJwt.verifyToken], appointmentController.takeAppointment);

    app.put("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, verifyAppointment.isOwnerOfAppointmentOrAdmin], appointmentController.updateAppointment);

    app.delete("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, verifyAppointment.isOwnerOfAppointmentOrAdmin], appointmentController.cancelAppointment);
    
    app.get("/getfit/api/v1/appointments", [authJwt.verifyToken], appointmentController.getAllAppointments);
    
    app.get("/getfit/api/v1/appointments/:id", [authJwt.verifyToken, verifyAppointment.isOwnerOfAppointmentOrAdmin], appointmentController.getOneAppointment);
    
}