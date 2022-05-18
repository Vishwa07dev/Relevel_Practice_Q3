const { createHospital } = require("../controllers/hospital.controller");


module.exports = (app) => {

    // create hospital  --> POST 127.0.0.1:8080/fitness/api/v1/hospital
    app.post("/fitness/api/v1/hospital", createHospital);

   
}