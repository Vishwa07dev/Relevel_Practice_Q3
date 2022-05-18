const appointmentController = require("../controllers/appointment.controller");

module.exports = (app) =>{

   // add appointment
   app.post("/getfit/api/v1/appointments",  appointmentController.createAppointment);

   // Update
   app.put("/getfit/api/v1/appointments/:id", appointmentController.updateAppointment);

   // Delete
   app.delete("/getfit/api/v1/hospitals/:id", appointmentController.deleteAppointment);
   
   // GET all appointment
   app.get("/getfit/api/v1/hospitals", appointmentController.getAllRecords);
   
   // GET Single appointment
   app.get("/getfit/api/v1/hospitals/:id", appointmentController.getOneAppointment);


};