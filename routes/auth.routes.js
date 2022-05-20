/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration

const authController = require("../controllers/auth.controller");

module.exports = (app)=> {

    //http://localhost:8081/getfit/api/v1/auth/signup
    app.post("/fitness/api/v1/auth/signup", authController.signup);

    //http://localhost:8081/getfit/api/v1/auth/signup
    app.post("/fitness/api/v1/auth/signin", authController.signin);
};