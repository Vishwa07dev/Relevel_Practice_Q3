const healthController = require("../controllers/health.controller");
const {authCheckPoint} = require("../middlewares");

module.exports = (app)=> {
    
    app.post("/getfit/api/v1/healthTrackRecords", [authCheckPoint.verifyToken, authCheckPoint.isOwner], healthController.createHealthTrackRecord);

    app.put("/getfit/api/v1/healthTrackRecords/:id", [authCheckPoint.verifyToken, authCheckPoint.isOwner], healthController.updateHealthTrackRecord);

    app.get("/getfit/api/v1/healthTrackRecords/:id", [authCheckPoint.verifyToken, authCheckPoint.isAdminOrOwner], healthController.getHealthTrackRecord);

    app.get("/getfit/api/v1/healthTrackRecords/", [authCheckPoint.verifyToken, authCheckPoint.isAdmin], healthController.getAllHealthTrackRecords);

    app.delete("/getfit/api/v1/healthTrackRecords/:id", [authCheckPoint.verifyToken, authCheckPoint.isAdminOrOwner], healthController.deleteHealthRecord);

}