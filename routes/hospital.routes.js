
const hospitalController = require("../controllers/hospital.controller");
const {HospitalCheckPoint} = require("../middlewares/index");


module.exports = (app)=> {
    
    app.post("/getfit/api/v1/hospitals", [HospitalCheckPoint.checkFields], hospitalController.createHospital);
    app.put("/getfit/api/v1/hospitals/{id}", [HospitalCheckPoint.isHospital], hospitalController.updateHospital);
    app.get("/getfit/api/v1/hospitals/{id}", [HospitalCheckPoint.isHospital], hospitalController.getHospital);

}