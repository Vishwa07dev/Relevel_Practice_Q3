// this file will act as the route for authentication and authorazation

// defined the routes - REST endpoints for user registration

const authController = require("../../controllers/auth.controller");

module.exports = (app) => {
  // POST 127.0.0.1:8081/getfit/api/v1/auth/signup

  app.post("/getfit/api/v1/auth/signup", authController.signup);

  // signin POST 127.0.0.1:8081/getfit/api/v1/auth/signin

  app.post("/getfit/api/v1/auth/signin", auth.authController.signin);
};
