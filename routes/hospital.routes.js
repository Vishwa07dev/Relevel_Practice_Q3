
const hospitalController = require("../controllers/hospital.controller")


module.exports = (app)=>{
    
    //POST 127.0.0.1:8081/getfit/api/v1/hospitals
    app.post("/getfit/api/v1/hospitals",  hospitalController.addHospital);

    //PUT 127.0.0.1:8081/getfit/api/v1/hospitals/:id
    app.put("/getfit/api/v1/hospitals/:id", hospitalController.updateHospital);

    // DELETE 127.0.0.1:8081/getfit/api/v1/hospitals/:id
    app.delete("/getfit/api/v1/hospitals/:id", hospitalController.deleteHospital);
    
    //GET 127.0.0.1:8081/getfit/api/v1/hospitals
    app.get("/getfit/api/v1/hospitals", hospitalController.getAllHospital);
    
    //GET 127.0.0.1:8081/getfit/api/v1/hospitals/:id
    app.get("/getfit/api/v1/hospitals/:id", hospitalController.getOneHospital);

}