const prescriptionCtrl = require('../controllers/prescription.controller');
const auth = require('../middlewares/authjwt');

module.exports = (app) => {
    // POST- /getfit/api/v1/prescriptions
    app.post("/getfit/api/v1/prescriptions", [auth.verifyToken, auth.isDoctor], prescriptionCtrl.providePrescription);
}