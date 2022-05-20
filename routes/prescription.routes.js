const prescriptionController = require("../controllers/prescription.controller");

module.exports = (app)=>{

    app.post("/getfit/api/v1/prescriptions", prescriptionController.createPrescription);

    app.get("/getfit/api/v1/prescriptions", prescriptionController.getAllPrescription);

    app.get("/getfit/api/v1/prescriptions/:id", prescriptionController.getOnePrescription);

    app.put("/getfit/api/v1/prescriptions/:id", prescriptionController.updatePrescription);

    app.delete("/getfit/api/v1/prescriptions/:id", prescriptionController.deletePrescription);


}