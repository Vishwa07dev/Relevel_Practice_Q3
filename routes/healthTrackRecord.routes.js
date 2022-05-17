
const healthTrackRecordController = require("../controllers/healthTrackRecord.controller");
const { authJwt, verifyTrackRecord } = require("../middlewares");

module.exports = (app)=>{
    
    app.post("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken, verifyTrackRecord.verifyAddRecord], healthTrackRecordController.addRecord);

    app.put("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken], healthTrackRecordController.updateRecord);

    app.delete("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken], healthTrackRecordController.deleteRecord);
    
    app.get("/getfit/api/v1/healthTrackRecords", [authJwt.verifyToken], healthTrackRecordController.getAllRecords);
    
    app.get("/getfit/api/v1/healthTrackRecords/:id", [authJwt.verifyToken], healthTrackRecordController.getOneRecord);
    
}