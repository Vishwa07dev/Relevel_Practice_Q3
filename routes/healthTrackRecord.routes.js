
const healthTrackRecordController = require("../controllers/healthTrackRecord.controller")
const { authJwt } = require("../middlewares");

module.exports = (app)=>{

    console.log([verifyToken, isPatientOrDoctor], healthTrackRecordController.addRecord);
    app.post("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken, authJwt.isPatientOrDoctor], healthTrackRecordController.addRecord);

    app.put("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken, authJwt.isPatientOrDoctor], healthTrackRecordController.updateRecord);

    app.delete("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken, authJwt.isPatientOrDoctor], healthTrackRecordController.deleteRecord);
    
    app.get("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken, authJwt.isPatientOrDoctor], healthTrackRecordController.getAllRecords);
    
    app.get("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken, authJwt.isPatientOrDoctor], healthTrackRecordController.getOneRecord);
    
}