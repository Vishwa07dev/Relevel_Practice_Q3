
const healthTrackRecordController = require("../controllers/healthTrackRecord.controller");
const { authJwt, verifyTrackRecord } = require("../middlewares");

module.exports = (app)=>{

    //POST 127.0.0.1:8081/getfit/api/v1/healthTrackRecords
    app.post("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken, authJwt.isPatient, verifyTrackRecord.verifyAddRecord], healthTrackRecordController.addRecord);

    //PUT 127.0.0.1:8081/getfit/api/v1/healthTrackRecords/:id
    app.put("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken, authJwt.isPatient], healthTrackRecordController.updateRecord);

    //DELETE 127.0.0.1:8081/getfit/api/v1/healthTrackRecords/:id
    app.delete("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken, authJwt.isPatient], healthTrackRecordController.deleteRecord);
    
    //GET 127.0.0.1:8081/getfit/api/v1/healthTrackRecords
    app.get("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken, verifyTrackRecord.verifyGetRecords], healthTrackRecordController.getAllRecords);

    //GET 127.0.0.1:8081/getfit/api/v1/healthTrackRecords/:id
    app.get("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken], healthTrackRecordController.getOneRecord);
    
}