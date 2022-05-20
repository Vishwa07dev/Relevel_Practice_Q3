const hospitalController = require("../controllers/hospital.controller");

module.exports = (app)=>{
 
    app.post("/getfit/api/v1/hospitals", hospitalController.addHospital);

    app.get("/getfit/api/v1/hospitals", hospitalController.getAllHospital);

    app.get("/getfit/api/v1/hospitals/:id", hospitalController.getOneHospital);

    app.put("/getfit/api/v1/hospitals/:id", hospitalController.updateHospital);

    app.delete("/getfit/api/v1/hospitals", hospitalController.deleteHospital);


    
    
}