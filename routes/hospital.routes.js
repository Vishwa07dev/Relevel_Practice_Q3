
const hospitalController = require("../controllers/hospital.controller")


module.exports = (app)=>{
    
    // add hospital
    app.post("/getfit/api/v1/hospitals",  hospitalController.addHospital);

    // UPDATE 
    app.put("/getfit/api/v1/hospitals/:id", hospitalController.updateHospital);

    // DELETE 
    app.delete("/getfit/api/v1/hospitals/:id", hospitalController.deleteHospital);
    
    // GET all Hospitals
    app.get("/getfit/api/v1/hospitals", hospitalController.getAllHospital);
    
    // GET Single hospital
    app.get("/getfit/api/v1/hospitals/:id", hospitalController.getOneHospital);

}