
const appointmentController = require("../controllers/appointment.controller")

module.exports = (app)=>{
    
    //  POST 127.0.0.1:8080/getfit/api/v1/appointment
    app.post("/getfit/api/v1/appointment", appointmentController.addAppointment);

    // GET 127.0.0.1:8080/getfit/api/v1/appointment
    app.get("/getfit/api/v1/appointment", appointmentController.getAllAppointment);

    // PUT 127.0.0.1:8080/getfit/api/v1/appointment/:id
    app.put("/getfit/api/v1/appointment/:id", appointmentController.updateAppointment);

    // DELETE 127.0.0.1:8080/getfit/api/v1/appointment/:id
    app.delete("/getfit/api/v1/appointment/:id", appointmentController.deleteAppointment);
}