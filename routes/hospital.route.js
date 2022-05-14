const HospitalCtrl = require('../controllers/hospital.controller');

module.exports = (app) => {

    // add new hospital
    app.post("/getfit/api/v1/hospitals", HospitalCtrl.addHospital);

    // get all hospitals
    app.get("/getfit/api/v1/hospitals", HospitalCtrl.getHospitals);

    // add hospital by id
    app.get("/getfit/api/v1/hospitals/:id", HospitalCtrl.getHospitalById);

    // update hospital details
    app.put("/getfit/api/v1/hospitals/:id", HospitalCtrl.updateHospital);

    // delete hospital
    app.delete("/getfit/api/v1/hospitals/:id", HospitalCtrl.deleteHospital);
}