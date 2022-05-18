const hospitalController = require("../controllers/hospital.controller");


module.exports = (app) => {

// POST Hospital
    app.post("/getfit/api/v1/hospitals", hospitalController.addHospital);

// UPDATE Query
 app.put("/getfit/api/v1/hospitals/:id", hospitalController.updateHospital);

 // DELETE Hospital
 app.delete("/getfit/api/v1/hospitals/:id", hospitalController.deleteHospital);

 // GET all Companies
 app.get("/getfit/api/v1/hospitals", hospitalController.getAllHospital);

 // GET single Company

 app.get("/getfit/api/v1/hospitals/:id", hospitalController.getOneHospital);
}