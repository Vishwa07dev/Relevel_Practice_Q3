const appointmentController = require("../controllers/appointment.controller")
const { authJwt, verifyTrackRecord } = require("../middlewares");

module.exports = (app)=>{
    
    //  POST 127.0.0.1:8081/getfit/api/v1/appointments
    app.post("/getfit/api/v1/appointments",[authJwt.verifyToken], appointmentController.addAppointment);

    // GET 127.0.0.1:8081/getfit/api/v1/appointments
    app.get("/getfit/api/v1/appointments",[authJwt.verifyToken] ,appointmentController.getAllAppointment);

    // GET 127.0.0.1:8081/getfit/api/v1/appointments/:id
    app.get("/getfit/api/v1/appointments/:id", [authJwt.verifyToken], appointmentController.getOneAppointment)

    // PUT 127.0.0.1:8081/getfit/api/v1/appointments/:id
    app.put("/getfit/api/v1/appointments/:id", [authJwt.verifyToken],appointmentController.updateAppointment);

}