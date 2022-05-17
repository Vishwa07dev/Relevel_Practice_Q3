
const hospitalController = require("../controllers/hospital.controller")


module.exports = (app)=>{
    

    app.post("/getfit/api/v1/hospitals",  hospitalController.addHospital);

    // UPDATE CALL
    app.put("/getfit/api/v1/hospitals/:id", hospitalController.updateHospital);

    // DELETE CALL
    app.delete("/getfit/api/v1/hospitals/:id", hospitalController.deleteHospital);
    
    // GET ALL COMPANIES
    app.get("/getfit/api/v1/hospitals", hospitalController.getAllHospital);
    
    // GET SINGLE COMPANY
    app.get("/getfit/api/v1/hospitals/:id", hospitalController.getOneHospital);

}