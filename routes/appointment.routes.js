const appointmentController = require("../controllers/appointment.controller");

module.exports = (app)=>{

    app.post("/getfit/api/v1/appointments", appointmentController.createAppointment);

    app.get("/getfit/api/v1/appointments", appointmentController.getAllAppointment);

    app.get("/getfit/api/v1/appointments/:id", appointmentController.getOneAppointment);

    app.put("/getfit/api/v1/appointments/:id", appointmentController.updateAppointment);

    app.delete("/getfit/api/v1/appointments", appointmentController.deleteAppointment);
}