
/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for Prescriptions

const prescriptionController = require("../controllers/prescription.controller");
const { authJwt, verifyPrescription } = require("../middlewares");

module.exports = (app)=>{

    app.post("/getfit/api/v1/prescriptions", [authJwt.verifyToken, verifyPrescription.verifyCreatePrescription], prescriptionController.createPrescription);

    app.put("/getfit/api/v1/prescriptions/:id", [authJwt.verifyToken, verifyPrescription.verifyValidPrescriptionForChange, verifyPrescription.isOwnerOfPrescriptionOrAdmin], prescriptionController.updatePrescription);

    app.delete("/getfit/api/v1/prescriptions/:id", [authJwt.verifyToken, verifyPrescription.verifyValidPrescriptionForChange, verifyPrescription.isOwnerOfPrescriptionOrAdmin], prescriptionController.deletePrescription);
    
    app.get("/getfit/api/v1/prescriptions", [authJwt.verifyToken], prescriptionController.getAllPrescriptions);
    
    app.get("/getfit/api/v1/prescriptions/:id", [authJwt.verifyToken, verifyPrescription.isOwnerOfPrescriptionOrAdmin], prescriptionController.getOnePrescription);
    
}