
const hospitalController = require("../controllers/hospital.controller");
const {HospitalCheckPoint} = require("../middlewares");
const {authCheckPoint} = require("../middlewares")


module.exports = (app)=> {
    
    app.post("/getfit/api/v1/hospitals", [authCheckPoint.validateSignInRequest, authCheckPoint.verifyToken, authCheckPoint.isAdmin, HospitalCheckPoint.checkFields], hospitalController.createHospital);

    app.put("/getfit/api/v1/hospitals/{id}", [authCheckPoint.validateSignInRequest, authCheckPoint.verifyToken, authCheckPoint.isAdmin, HospitalCheckPoint.isHospital], hospitalController.updateHospital);

    app.get("/getfit/api/v1/hospitals/{id}", [HospitalCheckPoint.isHospital], hospitalController.getHospital);

    app.get("/getfit/api/v1/hospitals/", hospitalController.getAllHospitals);

    app.delete("/getfit/api/v1/hospitals/{id}", [authCheckPoint.validateSignInRequest, authCheckPoint.verifyToken, authCheckPoint.isAdmin, HospitalCheckPoint.isHospital], hospitalController.deleteHospital);

}