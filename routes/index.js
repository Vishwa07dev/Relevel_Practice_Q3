
const hospitalRoutes = require('./hospital.routes')
const authRoutes = require('./auth.routes')
const healthTrackRecordRoutes = require("./healthTrackRecord.routes");
const appointmentRoutes = require("./appointment.routes");
const prescriptionRoutes = require("./prescription.routes");

module.exports = (app)=>{
    hospitalRoutes(app);
    authRoutes(app);
    healthTrackRecordRoutes(app);
    appointmentRoutes(app);
    prescriptionRoutes(app);
}