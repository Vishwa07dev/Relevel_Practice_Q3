


const appointmentRoutes = require("./appointment.routes");

const authRoutes = require("./auth.routes");
const healthTrackRecordRoutes = require("./healthTrackRecord.routes");

const hospitalRoutes = require("./hospital.routes");
const prescriptionRoutes = require("./prescription.routes")
const hospitalRoutes = require('./hospital.routes')
const authRoutes = require('./auth.routes')
const healthTrackRecordRoutes = require("./healthTrackRecord.routes");


module.exports = (app)=>{
    healthTrackRecordRoutes(app);
    appointmentRoutes(app);
    hospitalRoutes(app);
    authRoutes(app);

    prescriptionRoutes(app);
    
};

    healthTrackRecordRoutes(app);
}

